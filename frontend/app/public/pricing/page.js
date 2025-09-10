'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const { user } = useAuth();

  const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    credits: '3 resume generations',
    features: [
    '3 AI-tailored resumes',
    'Basic templates',
    'PDF export',
    'Email support'],

    buttonText: 'Get Started',
    buttonVariant: 'outline',
    href: user ?
    '/protected/dashboard' :
    '/auth/signup?redirect=/protected/dashboard'
  },
  {
    name: 'Basic',
    price: '₹299',
    period: '/month',
    credits: '25 resume generations',
    features: [
    '25 AI-tailored resumes/month',
    'Premium templates',
    'PDF & DOCX export',
    'Cover letter generation',
    'Priority support',
    'Interview Q&A prep'],

    buttonText: 'Choose Basic',
    buttonVariant: 'primary',
    href: user ?
    '/protected/purchase?plan=Basic' :
    '/auth/signup?redirect=/protected/purchase?plan=Basic',
    popular: true
  },
  {
    name: 'Pro',
    price: '₹599',
    period: '/month',
    credits: 'Unlimited generations',
    features: [
    'Unlimited AI-tailored resumes',
    'All premium templates',
    'PDF & DOCX export',
    'Cover letter generation',
    'Interview Q&A prep',
    'Priority support',
    'Analytics dashboard',
    'Team collaboration'],

    buttonText: 'Choose Pro',
    buttonVariant: 'primary',
    href: user ?
    '/protected/purchase?plan=Pro' :
    '/auth/signup?redirect=/protected/purchase?plan=Pro'
  }];


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan for your job search journey. All plans include AI-powered resume tailoring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) =>
            <div
              key={plan.name}
              className={`card p-8 relative ${
              plan.popular ? 'ring-2 ring-primary-500 shadow-xl' : ''}`
              }>

                {plan.popular &&
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
              }

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-primary-600 font-medium">{plan.credits}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) =>
                <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-success-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                )}
                </ul>

                <Link
                href={plan.href}
                className={`btn ${
                plan.buttonVariant === 'primary' ?
                'btn-primary' :
                'btn-outline'} w-full text-center`
                }>

                  {plan.buttonText}
                </Link>
              </div>
            )}
          </div>

          {/* Extra Credits */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need more credits? Purchase additional resume generations anytime.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="card p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">10 Credits</h4>
                <p className="text-2xl font-bold text-primary-600 mb-4">₹199</p>
                <Link
                  href={
                  user ?
                  '/protected/purchase?credits=10' :
                  '/auth/signup?redirect=/protected/purchase?credits=10'
                  }
                  className="btn btn-outline w-full">

                  Buy Credits
                </Link>
              </div>
              <div className="card p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">25 Credits</h4>
                <p className="text-2xl font-bold text-primary-600 mb-4">₹399</p>
                <Link
                  href={
                  user ?
                  '/protected/purchase?credits=25' :
                  '/auth/signup?redirect=/protected/purchase?credits=25'
                  }
                  className="btn btn-outline w-full">

                  Buy Credits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

}