import apiClient from "./axios";

export type PaymentStatus = "pending" | "confirmed" | "rejected";

export interface Payment {
  _id: string;
  student: {
    _id: string;
    fullname?: string;
    name?: string;
    email: string;
  };
  course: {
    _id: string;
    title: string;
  };
  amount: number;
  status: PaymentStatus;
  transactionDate: string;
  receiptUrl: string;
  rejectionReason?: string;
}

export interface PaymentSubmission {
  courseId: string;
  receiptUrl: string;
  amount: number;
}

export const getPayments = async (): Promise<Payment[]> => {
  const response = await apiClient.get("/payments");
  return response.data.data;
};

export const updatePaymentStatus = async (id: string, status: "confirmed" | "rejected", rejectionReason?: string): Promise<Payment> => {
  const response = await apiClient.patch(`/payments/${id}/process`, { status, rejectionReason });
  return response.data.data;
};

export const getPaymentStats = async () => {
  const payments = await getPayments();
  const totalRevenue = payments
    .filter((p) => p.status === "confirmed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const completedCount = payments.filter((p) => p.status === "confirmed").length;
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return {
    totalRevenue,
    pendingCount,
    completedCount,
    totalAmount,
  };
};

export const createPayment = async (paymentData: PaymentSubmission): Promise<Payment> => {
  const response = await apiClient.post("/payments/submit-receipt", paymentData);
  return response.data.data;
};
