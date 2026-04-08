import { create } from "zustand"

interface User {
  id: string
  email: string
  username: string
  role: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setIsLoading: (isLoading: boolean) => void
  logout: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, token: null })
  },

  initialize: () => {
    try {
      const token = localStorage.getItem("token")
      const userStr = localStorage.getItem("user")
      
      if (token && userStr) {
        const user = JSON.parse(userStr)
        set({ user, token, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error)
      set({ isLoading: false })
    }
  },
}))
