
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

export interface Items{
   orderQuantity:number,
   id:number
}

export interface OrderPayload {
    items: Items[]; 
    quantity:number;                 
    totalAmount: number;              
    paymentMethod: string;             
    paymentStatus: string;             
    orderStatus: string;               
    couponCode?: string;               
    discount?: number;                 
    finalAmount: number;               
    trackingNumber?: string;           
    shippingMethod: string;            
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    zip: string;
    country: string;
    province: string;
}

export interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  items: OrderItem[] | null;
  orderStatus?: string;
  trackingNumber:number;
  shippingMethod:string;
  paymentMethod:string
}