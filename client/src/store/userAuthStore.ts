// import { create } from 'zustand'

// interface AuthState {
//   isAuthenticated: boolean
//   setAuth: (auth: boolean) => void
//   logout: () => void
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: !!localStorage.getItem('accessToken'),
//   setAuth: (auth) => set({ isAuthenticated: auth }),
//   logout: () => {
//     localStorage.removeItem('accessToken')
//     set({ isAuthenticated: false })
//   },
// }))




import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  email: string | null
  setAuth: (auth: boolean, email?: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('accessToken'),
  email: localStorage.getItem('userEmail'),
  setAuth: (auth, email) => {
    const updates: Partial<AuthState> = { isAuthenticated: auth }
    if (email) {
      updates.email = email
      localStorage.setItem('userEmail', email)
    }
    set(updates)
  },
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userEmail')
    set({ isAuthenticated: false, email: null })
  },
}))
