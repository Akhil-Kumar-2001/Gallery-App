
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../Service/userAxiosInstance'

interface AuthState {
  isAuthenticated: boolean
  email: string | null
  setAuth: (auth: boolean, email?: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: !!localStorage.getItem('accessToken'),
      email: localStorage.getItem('userEmail'),
      
      setAuth: (auth, email) => {
        console.log("Setting auth state in store")
        const updates: Partial<AuthState> = { isAuthenticated: auth }
        if (email) {
          updates.email = email
          localStorage.setItem('userEmail', email)
        }
        set(updates)
        console.log(updates)
      },

      logout: async() => {
        await apiClient.post('/logout')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userEmail')
        set({ isAuthenticated: false, email: null })
      },
    }),
    {
      name: 'auth-store', // 🔑 This is the key used in localStorage
    }
  )
)
