export type PaymentStatus = "pending" | "completed" | "failed";

export interface Payment {
  id: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  receiptUrl: string;
}

const MOCK_PAYMENTS: Payment[] = [
  {
    id: "PAY-001",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    courseTitle: "SIA Door Supervisor Training",
    amount: 199,
    status: "completed",
    date: "2024-03-15",
    receiptUrl: "/receipts/sample.pdf",
  },
  {
    id: "PAY-002",
    studentName: "Jane Smith",
    studentEmail: "jane@example.com",
    courseTitle: "CCTV Operator Course",
    amount: 250,
    status: "pending",
    date: "2024-03-20",
    receiptUrl: "/receipts/sample.pdf",
  },
  {
    id: "PAY-003",
    studentName: "Michael Brown",
    studentEmail: "michael@example.com",
    courseTitle: "Emergency First Aid at Work",
    amount: 95,
    status: "completed",
    date: "2024-03-18",
    receiptUrl: "/receipts/sample.pdf",
  },
  {
    id: "PAY-004",
    studentName: "Emily Davis",
    studentEmail: "emily@example.com",
    courseTitle: "SIA Door Supervisor Training",
    amount: 199,
    status: "pending",
    date: "2024-03-22",
    receiptUrl: "/receipts/sample.pdf",
  },
  {
    id: "PAY-005",
    studentName: "Chris Wilson",
    studentEmail: "chris@example.com",
    courseTitle: "Close Protection Officer",
    amount: 1200,
    status: "completed",
    date: "2024-03-10",
    receiptUrl: "/receipts/sample.pdf",
  },
  {
    id: "PAY-006",
    studentName: "Sarah Miller",
    studentEmail: "sarah@example.com",
    courseTitle: "CCTV Operator Course",
    amount: 250,
    status: "pending",
    date: "2024-03-21",
    receiptUrl: "/receipts/sample.pdf",
  },
  {
    id: "PAY-007",
    studentName: "David Taylor",
    studentEmail: "david@example.com",
    courseTitle: "Conflict Management Training",
    amount: 85,
    status: "completed",
    date: "2024-03-12",
    receiptUrl: "/receipts/sample.pdf",
  },
];

export const getPayments = (): Payment[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("payments");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("payments", JSON.stringify(MOCK_PAYMENTS));
  }
  return MOCK_PAYMENTS;
};

export const updatePaymentStatus = (id: string, status: PaymentStatus): void => {
  const payments = getPayments();
  const updated = payments.map((p) => (p.id === id ? { ...p, status } : p));
  localStorage.setItem("payments", JSON.stringify(updated));
};

export const getPaymentStats = () => {
  const payments = getPayments();
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const completedCount = payments.filter((p) => p.status === "completed").length;
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return {
    totalRevenue,
    pendingCount,
    completedCount,
    totalAmount,
  };
};
