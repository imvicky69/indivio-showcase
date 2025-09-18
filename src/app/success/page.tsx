'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	AuthErrorCodes,
} from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import toast from 'react-hot-toast';

function BookingSuccessContent() {
	const searchParams = useSearchParams();
	const initialOrderId =
		typeof window !== 'undefined' ? searchParams.get('orderId') : null;
	const [orderId, setOrderId] = useState<string | null>(initialOrderId);
	const [status, setStatus] = useState<
		'LOADING' | 'PENDING' | 'SUCCESS' | 'FAILED'
	>('LOADING');

	useEffect(() => {
		// If no orderId in query, try sessionStorage (set by checkout flow)
		if (!orderId && typeof window !== 'undefined') {
			const stored = sessionStorage.getItem('indivioOrderId');
			if (stored) setOrderId(stored);
		}

		if (!orderId) {
			return;
		}

		const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
		// Defensive: ensure backend URL is configured
		if (!backendUrl) {
			console.error(
				'NEXT_PUBLIC_BACKEND_API_URL is not set. Cannot verify payment status.'
			);
			setStatus('FAILED');
			return;
		}

		// 1. Verify payment status with your backend
		fetch(`${backendUrl}/status/${orderId}`)
			.then(async (res) => {
				if (!res.ok) {
					const text = await res.text().catch(() => '<no-body>');
					console.error(
						'Payment status endpoint returned non-OK status',
						res.status,
						text
					);
					throw new Error(`Status endpoint returned ${res.status}`);
				}
				return res.json();
			})
			.then(async (data) => {
				// Helpful debug log for developers
				console.log('Payment status response from backend:', data);

				// Normalize server status to uppercase string and accept common success variants
				const serverStatus = (data?.status || '').toString().toUpperCase();
				const successVariants = new Set([
					'SUCCESS',
					'COMPLETED',
					'PAID',
					'SUCCESSFUL',
				]);

				if (data?.success && successVariants.has(serverStatus)) {
					// --- PHASE 1 FIX: Logic to save user data ---
					const savedDataString = sessionStorage.getItem('indivioBookingData');
					if (savedDataString) {
						const { plan, formData } = JSON.parse(savedDataString);
						try {
							// Attempt to get the user - either create a new one or sign in existing
							let user;
							try {
								// 2. Create the user in Firebase Auth
								const userCredential = await createUserWithEmailAndPassword(
									auth,
									formData.accountDetails.email,
									formData.accountDetails.password
								);
								user = userCredential.user;
								toast.success('Account created successfully!');
							} catch (authError: any) {
								// If user exists, try to sign them in instead
								if (authError?.code === AuthErrorCodes.EMAIL_EXISTS) {
									console.log('User exists, attempting to sign in');
									try {
										const signInCredential = await signInWithEmailAndPassword(
											auth,
											formData.accountDetails.email,
											formData.accountDetails.password
										);
										user = signInCredential.user;
										toast.success('Signed in to existing account');
									} catch (signInError) {
										console.error('Sign in failed:', signInError);
										// Continue without user auth - we'll use email as identifier
									}
								} else {
									console.error('User creation failed:', authError);
									// Continue without user auth
								}
							}

							// 3. Save the complete booking document to Firestore
							// Even if user creation/auth failed, we should save the booking
							const bookingData = {
								userId: user?.uid || 'guest',
								email: formData.accountDetails.email,
								planId: plan.id,
								planName: plan.name,
								pricePaid: data.amount,
								schoolInfo: formData.schoolDetails,
								bookingDate: serverTimestamp(),
								status: 'completed',
								orderId: orderId,
							};

							await addDoc(collection(db, 'bookings'), bookingData);
							console.log('Booking saved successfully', bookingData);

							// 4. Set status to SUCCESS and clean up
							toast.success('Booking confirmed!');
							setStatus('SUCCESS');
							sessionStorage.removeItem('indivioBookingData');
							sessionStorage.removeItem('indivioOrderId');
						} catch (error: any) {
							console.error('Error saving booking data:', error);
							toast.error('Error saving booking. Please contact support.');
							// Try one more time without user creation
							try {
								if (formData && plan) {
									await addDoc(collection(db, 'bookings'), {
										email: formData.accountDetails.email,
										planId: plan.id,
										planName: plan.name,
										pricePaid: data.amount,
										schoolInfo: formData.schoolDetails,
										bookingDate: serverTimestamp(),
										status: 'completed',
										orderId: orderId,
									});
									toast.success('Booking information saved');
									setStatus('SUCCESS');
								}
							} catch (finalError) {
								console.error(
									'Final attempt to save booking failed:',
									finalError
								);
								setStatus('FAILED');
							}
						}
					} else {
						// Data not found in session, might be a refresh.
						// Mark as success but log an issue.
						setStatus('SUCCESS');
					}
				} else if (serverStatus === 'PENDING' || data?.status === 'PENDING') {
					// Payment is still pending on server side
					console.log('Payment status is still PENDING for order', orderId);
					setStatus('PENDING');
				} else {
					console.warn('Payment not successful according to backend', data);
					setStatus('FAILED');
				}
			})
			.catch((err) => {
				console.error('Error while verifying payment status:', err);
				setStatus('FAILED');
			});
	}, [orderId]);

	// ... The JSX for displaying different statuses remains the same ...
	const router = useRouter();

	// Function to retry verification
	const handleRetry = () => {
		setStatus('LOADING');
		// Force re-run of the effect
		const currentOrderId = orderId;
		setOrderId(null);
		setTimeout(() => setOrderId(currentOrderId), 100);
	};

	return (
		<div className="booking-success-page mx-auto my-10 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
			{status === 'LOADING' && (
				<div className="text-center">
					<h2 className="mb-4 text-xl font-bold">Verifying your booking...</h2>
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
				</div>
			)}
			{status === 'PENDING' && (
				<div className="text-center">
					<h2 className="mb-4 text-2xl font-bold text-orange-500">
						Booking Pending
					</h2>
					<p className="mb-6">
						We are still confirming your payment. This may take a few moments.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<button
							onClick={handleRetry}
							className="rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700"
						>
							Refresh Status
						</button>
						<Link
							href="/contact"
							className="rounded-lg bg-gray-200 px-5 py-2 text-gray-800 transition-colors hover:bg-gray-300"
						>
							Contact Support
						</Link>
					</div>
				</div>
			)}
			{status === 'SUCCESS' && (
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 text-green-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h2 className="mb-4 text-2xl font-bold text-green-600">
						Booking Successful!
					</h2>
					<p className="mb-6">
						Your booking has been confirmed. Please check your email for further
						details.
					</p>
					<div className="mt-6">
						<Link
							href="/"
							className="rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700"
						>
							Go to Home
						</Link>
					</div>
				</div>
			)}
			{status === 'FAILED' && (
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 text-red-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
					<h2 className="mb-4 text-2xl font-bold text-red-600">
						Booking Failed
					</h2>
					<p className="mb-6">There was a problem confirming your booking.</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<button
							onClick={handleRetry}
							className="rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700"
						>
							Try Again
						</button>
						<Link
							href="/contact"
							className="rounded-lg bg-gray-200 px-5 py-2 text-gray-800 transition-colors hover:bg-gray-300"
						>
							Contact Support
						</Link>
						<Link
							href="/"
							className="rounded-lg bg-gray-200 px-5 py-2 text-gray-800 transition-colors hover:bg-gray-300"
						>
							Go Home
						</Link>
					</div>
				</div>
			)}
			{orderId && (
				<div className="mt-4 text-center text-xs text-gray-500">
					Order Reference: {orderId}
				</div>
			)}
		</div>
	);
}

export default function BookingSuccessPage() {
	return (
		<Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
			<div>
				<BookingSuccessContent />
				{/* Toast container */}
				{typeof window !== 'undefined' && <div id="toast-container" />}
			</div>
		</Suspense>
	);
}
