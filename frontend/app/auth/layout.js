
import { AuthProvider } from "@/lib/auth";
import Footer from '@/components/Footer'
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        {children}
      </AuthProvider>
      <Footer/>
    </div>);

}