'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
// ... other imports

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
							// 2. Create the user in Firebase Auth
							const auth = getAuth();
							const userCredential = await createUserWithEmailAndPassword(
								auth,
								formData.accountDetails.email,
								formData.accountDetails.password
							);
							const user = userCredential.user;
							// 3. Save the complete booking document to Firestore
							await addDoc(collection(db, 'bookings'), {
								userId: user.uid,
								planId: plan.id,
								planName: plan.name,
								pricePaid: data.amount,
								schoolInfo: formData.schoolDetails,
								bookingDate: serverTimestamp(),
								status: 'completed',
								orderId: orderId,
							});

							// 4. Set status to SUCCESS and clean up
							setStatus('SUCCESS');
							sessionStorage.removeItem('indivioBookingData');
							sessionStorage.removeItem('indivioOrderId');
						} catch (error: unknown) {
							console.error('Error saving booking data:', error);
							// Handle cases where user might already exist, etc.
							setStatus('FAILED');
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
	return (
		<div className="booking-success-page">
			{status === 'LOADING' && <p>Verifying your booking...</p>}
			{status === 'PENDING' && (
				<div>
					<h2>Booking Pending</h2>
					<p>
						We are still confirming your payment. This may take a few moments —
						please wait or contact support.
					</p>
				</div>
			)}
			{status === 'SUCCESS' && (
				<div>
					<h2>Booking Successful!</h2>
					<p>
						Your booking has been confirmed. Please check your email for further
						details.
					</p>
					<Link href="/">Go to Home</Link>
				</div>
			)}
			{status === 'FAILED' && (
				<div>
					<h2>Booking Failed</h2>
					<p>
						There was a problem confirming your booking. Please contact support.
					</p>
					<Link href="/">Go to Home</Link>
				</div>
			)}
		</div>
	);
}

export default function BookingSuccessPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BookingSuccessContent />
		</Suspense>
	);
}
