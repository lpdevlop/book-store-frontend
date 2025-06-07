
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
