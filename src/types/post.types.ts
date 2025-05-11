export interface PostAuthor {
  id: string;
  name: string;
  fakultas: string;
  avatar: string | null;
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
  author: PostAuthor;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface PostMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PostsResponse {
  statusCode: number;
  message: string;
  data: Post[];
  meta: PostMeta;
}
