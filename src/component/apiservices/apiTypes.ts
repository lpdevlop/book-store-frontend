
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