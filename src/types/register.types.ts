export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  fakultas: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  fakultas: string;
  avatar: string;
  role: string;
}

export interface RegisterResponse {
  user: User;
}

export interface RegisterError {
  message: string;
  status: number;
  statusCode: number;
}
