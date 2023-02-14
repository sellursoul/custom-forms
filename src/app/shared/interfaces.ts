export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface AuthResponse {
  idToken: string
  expiresIn: string
}

export interface Environment {
  production: boolean,
  apiKey: string
}
