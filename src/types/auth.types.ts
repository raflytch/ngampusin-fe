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

export interface Post {
  id: string;
  title: string;
  content: string;
  image: string | null;
  isAnonymous: boolean;
  kategori: string;
  fakultas: string;
  authorId: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    fakultas: string;
    avatar: string | null;
    role: string;
  };
  likesCount: number;
  commentsCount: number;
}

export interface ProfileResponse {
  user: User;
  posts: Post[];
  access_token: string;
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

export interface ProfileUpdateRequest {
  name: string;
  email: string;
  fakultas: string;
}
