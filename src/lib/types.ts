// Checkout form types
export interface SchoolDetailsData {
	schoolName: string;
	contactName: string;
	email: string;
	phone: string;
}

export interface AccountDetailsData {
	email: string;
	password: string;
	confirmPassword: string;
}

// Re-export as CentralAccountDetails for compatibility
export type CentralAccountDetails = AccountDetailsData;
