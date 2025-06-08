
export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
}

export interface UserProfile {
  email: string;
  lastName: string;
  role: string;
}

export interface UserProfilePayload {
  id: string;
}

export interface AdminRegPayload{
   firstName: string
   email: string,
   password: string
}

export interface UserRegistrationResponse {
  responseTxt: boolean;
}

export interface CustomerRegistrationResponse {
  responseTxt: boolean;
}
export interface CustomerRegistrationPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    address: string,
}

export interface Books {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  publicationDate?: string;
  price?: number;
  language?: string;
  genre?: string;
  stockQuantity?: number;
  description?: string;
  averageRating?: number;
  pageCount?: number;
  format?: string;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface BooksSearch{
  
    title: string
    page: number,
    size: number
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

