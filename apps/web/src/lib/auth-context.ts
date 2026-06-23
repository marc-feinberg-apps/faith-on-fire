export interface AuthContext {
  isAuthenticated: boolean
  user: { id: string; email: string } | null
}
