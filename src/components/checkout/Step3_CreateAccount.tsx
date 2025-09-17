'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod'; // We'll use Zod for powerful schema validation
import { zodResolver } from '@hookform/resolvers/zod'; // And its resolver for react-hook-form

// 1. Define a schema for validation using Zod
const accountSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Point the error to the confirmPassword field
});

// 2. Infer the TypeScript type from the schema
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
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-8">
          <h2 className="text-2xl font-bold font-display text-primary">Create Your InDashboard Account</h2>
          <p className="text-muted-foreground mt-1">
            This will be your administrator account for managing your website.
          </p>

          <div className="mt-8 space-y-6">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Login Email</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full bg-input border rounded-md p-3 ${errors.email ? 'border-red-500' : 'border-border'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">Password</label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className={`w-full bg-input border rounded-md p-3 ${errors.password ? 'border-red-500' : 'border-border'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword')}
                className={`w-full bg-input border rounded-md p-3 ${errors.confirmPassword ? 'border-red-500' : 'border-border'}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}