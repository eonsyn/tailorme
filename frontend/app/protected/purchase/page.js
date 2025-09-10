'use client';

import React, { useState, useEffect } from "react";
import Script from "next/script";
import toast from 'react-hot-toast';
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";
import PlanCard from '@/components/purchase/PlanCard';
import PaymentHist from "@/components/purchase/PaymentHist";
export default function PurchasePage() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [userData, setUserData] = useState(null);
  const { user, checkAuth } = useAuth();
  const [openHist, setOpenHist] = useState(false);
  // Fetch latest user (credits)
  useEffect(() => {
    if (user?._id) {
      setUserData(user);
    }
  }, [user]);

  const handlePayment = async (planKey) => {
    if (!user?._id) {
      toast.error("Please login to purchase credits.");
      return;
    }

    try {
      setLoadingPlan(planKey);

      // 🟢 Create order for selected credit pack
      const orderRes = await api.post("/payment/create-order", { plan: planKey });
      const { order } = orderRes;
      if (!order) throw new Error("Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Tailor Me",
        description: `${planKey.toUpperCase()} Credits Purchase`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const payload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              plan: planKey
            };

            const verifyRes = await api.post("/payment/verify-payment", payload);

            if (verifyRes.success) {
              toast.success(`${verifyRes.message}`);
              // Refresh user data after credits added
              checkAuth();
              setUserData(user);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            toast.error("Verification error. Try again.");
          }
        },
        theme: { color: "#6366f1" }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  // Credit packs (sync with backend CREDIT_PLANS)
  const creditPlans = [
  { key: "basic", title: "Basic Pack", price: 20, credits: 30 },
  { key: "standard", title: "Standard Pack", price: 40, credits: 100 },
  { key: "premium", title: "Premium Pack", price: 100, credits: 250 }];

  const printuser = () => {
    console.log(user);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Toggle Buttons Bar */}
      <div className="flex w-full max-w-lg mb-8 border rounded-full bg-white shadow">
        <button
          onClick={() => setOpenHist(true)}
          className={`flex-1 py-2 px-4 rounded-full transition 
            ${openHist ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
          
          History
        </button>
        <button
          onClick={() => setOpenHist(false)}
          className={`flex-1 py-2 px-4 rounded-full transition 
            ${!openHist ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
          
          Buy Credit
        </button>
      </div>

      {/* Content */}
      {openHist ?
      <PaymentHist payments={user.payments} /> :

      <>
          <h1
          onClick={printuser}
          className="text-3xl font-bold mb-8 text-center">
          
            Buy Credits
          </h1>

          <p className="mb-6 text-gray-600">
            Available Credits: <strong>{userData?.credits || 0}</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {creditPlans.map((plan) =>
          <PlanCard
            key={plan.key}
            title={plan.title}
            price={plan.price}
            type="Credit"
            credits={plan.credits}
            loading={loadingPlan === plan.key}
            onPurchase={() => handlePayment(plan.key)} />

          )}
          </div>
        </>
      }
    </div>);

}