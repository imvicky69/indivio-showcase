'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod'; // We'll use Zod for powerful schema validation
import { zodResolver } from '@hookform/resolvers/zod'; // And its resolver for react-hook-form
import { AccountDetailsData as CentralAccountDetails } from '../../lib/types';

// 1. Define a schema for validation using Zod (runtime validation)
const accountSchema = z
	.object({
		email: z.string().email('Please enter a valid email address.'),
		password: z.string().min(8, 'Password must be at least 8 characters long.'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

// 2. Use the Zod-inferred type for the form data to match the schema
export type AccountDetailsData = z.infer<typeof accountSchema>;

interface Step3Props {
	onSuccess: (data: AccountDetailsData) => void;
	initialData?: Partial<AccountDetailsData>;
}

export function Step3_CreateAccount({ onSuccess, initialData }: Step3Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountDetailsData>({
		resolver: zodResolver(accountSchema), // 3. Use the Zod resolver
		defaultValues: {
			email: initialData?.email || '',
			password: '',
			confirmPassword: '',
		},
	});

	// This will only be called if validation against the Zod schema passes
	const processData: SubmitHandler<AccountDetailsData> = (data) => {
		onSuccess(data);
	};

	return (
		<form id="create-account-form" onSubmit={handleSubmit(processData)}>
			<div className="rounded-2xl border border-gray-200 bg-white shadow-lg">
				<div className="p-8">
					<h2 className="font-display text-2xl font-bold text-primary">
						Create Your InDashboard Account
					</h2>
					<p className="mt-1 text-muted-foreground">
						This will be your administrator account for managing your website.
					</p>

					<div className="mt-8 space-y-6">
						{/* Email Address */}
						<div>
							<label
								htmlFor="email"
								className="mb-2 block text-sm font-medium text-muted-foreground"
							>
								Login Email
							</label>
							<input
								type="email"
								id="email"
								{...register('email')}
								className={`w-full rounded-md border bg-input p-3 ${errors.email ? 'border-red-500' : 'border-border'}`}
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="mb-2 block text-sm font-medium text-muted-foreground"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								{...register('password')}
								className={`w-full rounded-md border bg-input p-3 ${errors.password ? 'border-red-500' : 'border-border'}`}
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Confirm Password */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="mb-2 block text-sm font-medium text-muted-foreground"
							>
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								{...register('confirmPassword')}
								className={`w-full rounded-md border bg-input p-3 ${errors.confirmPassword ? 'border-red-500' : 'border-border'}`}
							/>
							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-500">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
