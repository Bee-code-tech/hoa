import apiClient from "@/lib/axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Chapter {
  id?: string;
  _id?: string; // Support MongoDB _id
  title: string;
  content: string;
  type: "video" | "pdf";
  position: number;
  isFree?: boolean;
  isPublished?: boolean;
}

export interface Course {
  id?: string;
  _id?: string; // Support MongoDB _id
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  price: number;
  isPublished?: boolean;
  slug?: string;
  chapters?: Chapter[];
  duration?: string;
  students?: string;
  badge?: string;
  progress?: number;
  paymentStatus?: "enrolled" | "pending" | "none";
  includes?: string[];
}

export const courseService = {
  /**
   * Fetch all courses.
   * Authenticated students receive a `paymentStatus` field.
   */
  async getCourses() {
    const response = await apiClient.get<ApiResponse<Course[]>>("/courses");
    return response.data.data;
  },

  /**
   * Fetch a single course by ID or Slug.
   */
  async getCourse(idOrSlug: string) {
    const response = await apiClient.get<ApiResponse<Course>>(`/courses/${idOrSlug}`);
    return response.data.data;
  },

  /**
   * Create a new course (Admin Only).
   */
  async createCourse(data: Partial<Course>) {
    const response = await apiClient.post<ApiResponse<Course>>("/courses", data);
    return response.data.data;
  },

  /**
   * Update course details or manage chapters (Admin Only).
   */
  async updateCourse(id: string, data: Partial<Course>) {
    const response = await apiClient.patch<ApiResponse<Course>>(`/courses/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a course and its chapters (Admin Only).
   */
  async deleteCourse(id: string) {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
  },
};
