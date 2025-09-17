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
  const orderId = searchParams.get('orderId');
  const [status, setStatus] = useState('LOADING');

  useEffect(() => {
    if (orderId) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      // 1. Verify payment status with your backend
      fetch(`${backendUrl}/status/${orderId}`)
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success && data.status === 'SUCCESS') {
            // --- PHASE 1 FIX: Logic to save user data ---
            const savedDataString =
              sessionStorage.getItem('indivioBookingData');
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
          } else {
            setStatus('FAILED');
          }
        })
        .catch(() => setStatus('FAILED'));
    } else {
      setStatus('FAILED');
    }
  }, [orderId]);

  // ... The JSX for displaying different statuses remains the same ...
  return (
    <div className="booking-success-page">
      {status === 'LOADING' && <p>Verifying your booking...</p>}
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
