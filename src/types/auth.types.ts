export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  fakultas: string;
  avatar: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}

export interface LoginError {
  message: string;
  error: string;
  statusCode: number;
}

export interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
}
