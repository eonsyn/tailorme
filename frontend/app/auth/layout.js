import { AuthProvider } from "@/lib/auth"
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        {children}
      </AuthProvider>
      
    </div>
  )
}