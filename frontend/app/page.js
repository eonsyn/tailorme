'use client'
import Link from 'next/link';
import Navbar from '../components/Navbar'; 
import background from '@/public/Images/background.png'
import Image from 'next/image';
import BackgroundImage from '@/components/BackgroundImage';
import Review from '@/components/review/Review';
import Faq from '@/components/Faq';
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 relative pb-16 px-4">
        <BackgroundImage/>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold   mb-6 leading-tight">
            AI-Powered
            <span className="block -mt-3">Resume Tailoring</span>
          </h1>
          <p className="text-base  mb-8 max-w-xl mx-auto leading-relaxed">
           Turn your generic resume into a job-ready masterpiece. Our AI tailors resumes, cover letters, and self-improvement tips for the perfect role fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn btn-primary text-lg px-8 py-4">
              Get Started Free
            </Link>
            <Link href="/public/pricing" className="btn btn-outline text-lg px-8 py-4">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center   mb-16">
            Everything You Need to Land Your Dream Job
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Resume Tailoring</h3>
              <p className="  leading-relaxed">
                Paste any job description and watch our AI transform your resume to match exactly what employers are looking for.
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16   rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8  " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold  mb-4">Cover Letter Generation</h3>
              <p className="  leading-relaxed">
                Generate compelling cover letters that perfectly complement your tailored resume for each application.
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8  " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Interview Q&A Prep</h3>
              <p className="  leading-relaxed">
                Get AI-generated answers to common interview questions based on the specific job requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Review/>
      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold  mb-6">
            Ready to Transform Your Job Search?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Join thousands of professionals who&apos;ve landed their dream jobs with AI-tailored resumes.
          </p>
          <Link href="/auth/signup" className="btn btn-outline px-8 py-4 rounded-lg font-semibold text-lg   transition-colors">
            Start Tailoring Now
          </Link>
        </div>
      </section>

      <Faq/>
 
    </div>);

}