export interface ApplicationData {
  mobileNumber?: string;
  firstName?: string;
  lastName?: string;
  pan?: string;
  dob?: string;
  employmentType?: 'salaried' | 'self-employed' | 'business' | 'student' | 'company';
  monthlyIncome?: number;
  loanAmount?: number;
  tenure?: number;
  address?: string;
}

export interface Lender {
  id: string;
  name: string;
  logo?: string;
  interestRate: number;
  maxLoanAmount: number;
  processingFee: number;
  utmLink: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  sessionId?: string;
}

export interface ApplicationResponse {
  success: boolean;
  applicationId?: string;
  message: string;
  lenders?: Lender[];
}
