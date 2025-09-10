'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function SignupFormClient() {
  const searchParams = useSearchParams();
  const referralCodeFromUrl = searchParams.get('ref') || '';

  const [loading, setLoading] = useState(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState('');
  const [showReferral, setShowReferral] = useState(!!referralCodeFromUrl);
  const { signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceFingerprint(result.visitorId);
    };
    handleprint();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    referralCode: referralCodeFromUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    setLoading(true);
    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.username,
        formData.referralCode,
        deviceFingerprint
      );
      toast.success('Account created successfully!');
      router.push('/protected/dashboard');
    } catch (error) {
      toast.error(error?.message || 'Signup failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo + Heading */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">TailorMe</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600 mt-2">Start tailoring resumes with AI</p>
        </div>

        {/* Signup Card */}
        <div className="card p-8 shadow rounded-lg bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input w-full"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s+/g, '');
                  setFormData((prev) => ({ ...prev, username: value }));
                }}
                className="input w-full"
                placeholder="your-unique-username"
                required
              />
              <p className="text-xs text-gray-500 mt-1">No spaces allowed</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input w-full"
                placeholder="you@company.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input w-full"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input w-full"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            {/* Referral Code */}
            {showReferral ? (
              <div>
                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code
                </label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="input w-full bg-gray-50"
                  placeholder="Enter referral code (optional)"
                  readOnly={!!referralCodeFromUrl}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowReferral(true)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Have a referral code?
              </button>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center"
            >
              {loading && <LoadingSpinner size="sm" className="mr-2" />}
              Create Account
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
