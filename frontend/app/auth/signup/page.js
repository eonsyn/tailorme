'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function SignupFormContent() {
  const searchParams = useSearchParams();
  const referralCodeFromUrl = searchParams.get('ref') || '';

  const [loading, setLoading] = useState(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState('');
  const [showReferral, setShowReferral] = useState(!!referralCodeFromUrl);
  const { signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    handlePrint();
  }, []);

  const handlePrint = async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceFingerprint(result.visitorId);
    } catch (error) {
      console.error('Error generating fingerprint:', error);
    }
  };

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <div className="max-w-md w-full">
      {/* Logo + Heading */}
      <div className="text-center mb-8">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">T</span>
          </div>
          <span className="text-2xl font-bold text-foreground">TailorMe</span>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
        <p className="text-muted-foreground mt-2">Start tailoring resumes with AI</p>
      </div>

      {/* Signup Card */}
      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
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
              className="input"
              placeholder="your-unique-username"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">No spaces allowed</p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="you@company.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          {/* Referral Code */}
          {showReferral ? (
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-foreground mb-2">
                Referral Code
              </label>
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className="input bg-muted"
                placeholder="Enter referral code (optional)"
                readOnly={!!referralCodeFromUrl}
              />
            </div>
          ) : (
            <button type="button" onClick={() => setShowReferral(true)} className="link text-sm">
              Have a referral code?
            </button>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading} className="btn btn-primary w-full flex items-center justify-center">
            {loading && <LoadingSpinner size="sm" className="mr-2" />}
            Create Account
          </button>
        </form>
      </div>

      {/* Login Link */}
      <p className="text-center mt-6 text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="link">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <SignupFormContent />
      </Suspense>
    </div>
  );
}
