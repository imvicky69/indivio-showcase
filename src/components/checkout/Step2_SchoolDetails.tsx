'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { SchoolDetailsData } from '../../lib/types';

// Re-export the shared SchoolDetailsData type for compatibility
export type { SchoolDetailsData };

interface Step2Props {
	// Function to call when the form is successfully submitted
	onSuccess: (data: SchoolDetailsData) => void;
	// Pre-populate form if user comes back to this step
	initialData?: Partial<SchoolDetailsData>;
}

export function Step2_SchoolDetails({ onSuccess, initialData }: Step2Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SchoolDetailsData>({
		defaultValues: initialData || {}, // Set initial values
	});

	// This function is wrapped by react-hook-form's handleSubmit
	// It will only be called if the form is valid.
	const processData: SubmitHandler<SchoolDetailsData> = (data) => {
		onSuccess(data);
	};

	return (
		<form id="school-details-form" onSubmit={handleSubmit(processData)}>
			<div className="rounded-2xl border border-gray-200 bg-white shadow-lg">
				<div className="p-8">
					<h2 className="font-display text-2xl font-bold text-primary">
						Your School&apos;s Details
					</h2>
					<p className="mt-1 text-muted-foreground">
						Please provide some basic information about your institution.
					</p>

					<div className="mt-8 space-y-6">
						{/* School Name */}
						<div>
							<label
								htmlFor="schoolName"
								className="mb-2 block text-sm font-medium text-muted-foreground"
							>
								School / Institution Name
							</label>
							<input
								type="text"
								id="schoolName"
								{...register('schoolName', {
									required: 'School name is required',
								})}
								className={`w-full rounded-md border bg-input p-3 ${errors.schoolName ? 'border-red-500' : 'border-border'}`}
							/>
							{errors.schoolName && (
								<p className="mt-1 text-sm text-red-500">
									{errors.schoolName.message}
								</p>
							)}
						</div>

						{/* Contact Person's Name */}
						<div>
							<label
								htmlFor="contactName"
								className="mb-2 block text-sm font-medium text-muted-foreground"
							>
								Contact Person&apos;s Full Name
							</label>
							<input
								type="text"
								id="contactName"
								{...register('contactName', {
									required: 'Contact name is required',
								})}
								className={`w-full rounded-md border bg-input p-3 ${errors.contactName ? 'border-red-500' : 'border-border'}`}
							/>
							{errors.contactName && (
								<p className="mt-1 text-sm text-red-500">
									{errors.contactName.message}
								</p>
							)}
						</div>

						{/* Email Address */}
						<div>
							<label
								htmlFor="email"
								className="mb-2 block text-sm font-medium text-muted-foreground"
							>
								Official Email Address
							</label>
							<input
								type="email"
								id="email"
								{...register('email', {
									required: 'A valid email is required',
									pattern: {
										value: /^\S+@\S+$/i,
										message: 'Invalid email address',
									},
								})}
								className={`w-full rounded-md border bg-input p-3 ${errors.email ? 'border-red-500' : 'border-border'}`}
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Phone Number */}
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
								{...register('phone', { required: 'Phone number is required' })}
								className={`w-full rounded-md border bg-input p-3 ${errors.phone ? 'border-red-500' : 'border-border'}`}
							/>
							{errors.phone && (
								<p className="mt-1 text-sm text-red-500">
									{errors.phone.message}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
