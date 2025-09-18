'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

// Define the structure of our form data
type FormInputs = {
  fullName: string;
  schoolName: string;
  phone: string;
  message: string;
};

export function ContactFormArea() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic WhatsApp link generation
  const whatsappNumber = '+919211641566';
  const whatsappMessage =
    "Hello Indivio! I'm interested in your services and would like to know more.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    const notification = toast.loading('Sending your message...');

    try {
      // Add a new document with a generated id to the "contact-submissions" collection
      await addDoc(collection(db, 'contact-submissions'), {
        ...data,
        submittedAt: serverTimestamp(), // Add a server-side timestamp
      });

      toast.success(
        'Message sent successfully! We will get back to you soon.',
        { id: notification }
      );
      reset(); // Clear the form
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Something went wrong. Please try again.', {
        id: notification,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* This component provides the toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-6">
          {/* Main heading */}
          <div className="mb-16 text-center">
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Let&apos;s Connect
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Whether you have a question about our features, pricing, or just
              want to say hello, our team is ready to answer all your questions.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
            {/* Left Column: The Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-lg"
            >
              <h2 className="mb-6 font-display text-2xl font-bold text-primary">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-muted-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register('fullName', {
                        required: 'Full name is required',
                      })}
                      className="w-full rounded-md border border-border bg-input p-3"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="schoolName"
                      className="mb-2 block text-sm font-medium text-muted-foreground"
                    >
                      School / Institution
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      {...register('schoolName', {
                        required: 'School name is required',
                      })}
                      className="w-full rounded-md border border-border bg-input p-3"
                    />
                    {errors.schoolName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.schoolName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-muted-foreground"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', {
                      required: 'Phone number is required',
                    })}
                    className="w-full rounded-md border border-border bg-input p-3"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-muted-foreground"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Message is required',
                    })}
                    className="w-full rounded-md border border-border bg-input p-3"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Right Column: Contact Details & WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="mb-6 font-display text-2xl font-bold text-primary">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-6">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl border-2 border-green-500 bg-green-500/10 p-6 transition-transform hover:scale-105"
                >
                  <MessageSquare className="h-8 w-8 flex-shrink-0 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Phone / WhatsApp
                    </h3>
                    <p className="text-lg font-bold text-green-600">
                      +91 9211641566
                    </p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Email
                    </h3>
                    <p className="text-muted-foreground">support@indivio.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Business Hours
                    </h3>
                    <p className="text-muted-foreground">
                      Monday – Friday, 10:00 AM – 6:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
