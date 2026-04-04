import apiClient from "@/lib/axios";

export const authService = {
  async register(data: any) {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  async login(data: any) {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  async verifyOtp(data: { email: string; otp: string }) {
    const response = await apiClient.post("/auth/verify-otp", data);
    return response.data;
  },

  async resendOtp(email: string) {
    const response = await apiClient.post("/auth/resend-otp", { email });
    return response.data;
  },
};
