export interface BackendApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
