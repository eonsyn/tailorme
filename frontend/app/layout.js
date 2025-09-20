import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/lib/auth";
import Footer from "@/components/Footer";
export const metadata = {
  title: 'TailorMe - AI-Powered Resume Tailoring',
  description: 'Create job-specific resumes tailored to any job description using AI'
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff'
              }
            }} />
           
          </AuthProvider>
          <Footer></Footer>
      </body>
    </html>);

}