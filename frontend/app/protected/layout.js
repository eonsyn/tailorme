import { AuthProvider } from '../../lib/auth';
import AuthGuard from '../../components/AuthGuard';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '@/components/Footer';
export default function ProtectedLayout({ children }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <DashboardNavbar />
          <main className="max-w-7xl mx-auto py-6 px-4">
            {children}
          </main>
        </div>
         <Footer />
      </AuthGuard>
    </AuthProvider>);

}