'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// --- Data Type Imports ---
import { Plan, Offer } from '@/lib/plans';
import { SchoolDetailsData } from './Step2_SchoolDetails';
import { AccountDetailsData } from './Step3_CreateAccount';

// --- Step Component Imports ---
import { Step1_PlanConfirmation } from './Step1_PlanConfirmation';
import { Step2_SchoolDetails } from './Step2_SchoolDetails';
import { Step3_CreateAccount } from './Step3_CreateAccount';
import { Step4_Payment } from './Step4_Payment';

// --- THE FIX: Renamed interface to avoid browser conflicts ---
export interface WizardFormData {
  discountOffer: Offer | null;
  schoolDetails: SchoolDetailsData | null;
  accountDetails: AccountDetailsData | null;
}

const steps = [
  { id: 1, name: 'Plan Confirmation' },
  { id: 2, name: 'School Details' },
  { id: 3, name: 'Create Account' },
  { id: 4, name: 'Payment' },
];

export function CheckoutWizard({ plan }: { plan: Plan }) {
  const [currentStep, setCurrentStep] = useState(1);
  // --- THE FIX: Use the new interface name for the state ---
  const [formData, setFormData] = useState<WizardFormData>({
    discountOffer: null,
    schoolDetails: null,
    accountDetails: null,
  });

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleStep2Success = (data: SchoolDetailsData) => {
    setFormData((prev) => ({ ...prev, schoolDetails: data }));
    goToNextStep();
  };

  const handleStep3Success = (data: AccountDetailsData) => {
    setFormData((prev) => ({ ...prev, accountDetails: data }));
    goToNextStep();
  };

  const handleNextClick = () => {
    if (currentStep === 2) {
      document
        .getElementById('school-details-form')
        ?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );
    } else if (currentStep === 3) {
      document
        .getElementById('create-account-form')
        ?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );
    } else {
      goToNextStep();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1_PlanConfirmation
            plan={plan}
            onDiscountApply={(offer) =>
              setFormData((p) => ({ ...p, discountOffer: offer }))
            }
          />
        );
      case 2:
        return (
          <Step2_SchoolDetails
            onSuccess={handleStep2Success}
            initialData={formData.schoolDetails || undefined}
          />
        );
      case 3:
        const initialAccountData = {
          email: formData.schoolDetails?.email,
          ...formData.accountDetails,
        };
        return (
          <Step3_CreateAccount
            onSuccess={handleStep3Success}
            initialData={initialAccountData}
          />
        );
      case 4:
        return <Step4_Payment plan={plan} formData={formData} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="container mx-auto px-6 py-16 sm:py-24">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex w-full items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-300 ${currentStep >= step.id ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'}`}
                >
                  {step.id}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div
                    className={`text-sm font-semibold ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-1 flex-auto transition-colors duration-500 ${currentStep > index + 1 ? 'bg-primary' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="rounded-full bg-gray-200 px-6 py-2 font-semibold text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {currentStep < steps.length && (
            <button
              onClick={handleNextClick}
              type={
                currentStep === 2 || currentStep === 3 ? 'submit' : 'button'
              }
              form={
                currentStep === 2
                  ? 'school-details-form'
                  : currentStep === 3
                    ? 'create-account-form'
                    : undefined
              }
              className="rounded-full bg-primary px-8 py-2 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
