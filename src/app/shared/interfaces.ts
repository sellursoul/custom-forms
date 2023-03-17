export interface AuthResponse {
  idToken: string
  email:	string
  refreshToken:	string
  expiresIn: string
  localId:	string
  registered?:	boolean
}

export interface Environment {
  production: boolean,
  apiKey: string
}

