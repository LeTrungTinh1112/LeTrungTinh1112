import { mockUsers } from "./mock-data"

export interface User {
  id: string
  username: string
  role: string
  name: string
  email: string
  phone: string
}

export const authenticateUser = (username: string, password: string): User | null => {
  const user = mockUsers.find((u) => u.username === username && u.password === password)
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("currentUser")
  return userStr ? JSON.parse(userStr) : null
}

export const setCurrentUser = (user: User) => {
  localStorage.setItem("currentUser", JSON.stringify(user))
}

export const logout = () => {
  localStorage.removeItem("currentUser")
  window.location.href = "/"
}

export const hasPermission = (userRole: string, requiredRoles: string[]): boolean => {
  return requiredRoles.includes(userRole)
}
