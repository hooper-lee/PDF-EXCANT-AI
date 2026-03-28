export interface ProcessMockPaymentInput {
  userId: string;
  planId: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardholderName: string;
  country?: string;
}

export interface ProcessMockPaymentResult {
  success: boolean;
  orderId: string;
  message: string;
  user: {
    plan: string;
    pagesLimit: number;
    pagesUsed: number;
  };
}
