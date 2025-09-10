import React from "react"
import {
  CreditCard,
  FileText,
  Wallet,
  Coins,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"

function PaymentHist({ payments }) {
  return (
    <div className="p-6 border rounded-xl shadow bg-white w-full max-w-3xl">
      <h1 className="text-xl font-bold mb-5 flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-600" />
        Recent 5 Payment History
      </h1>

      {payments && payments.length > 0 ? (
        <ul className="space-y-4">
          {payments.map((payment, idx) => (
            <li
              key={payment._id || idx}
              className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              {/* Top Row: Plan + Date */}
              <div className="flex justify-between items-center">
                <span className="font-semibold capitalize text-blue-600">
                  {payment.plan}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(payment.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Payment Info */}
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  Payment ID: <span className="font-medium">{payment.paymentId}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Order ID: <span className="font-medium">{payment.orderId}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-green-600" />
                  Amount:{" "}
                  <span className="font-medium">
                    {payment.amount/100} {payment.currency}
                  </span>
                </p>
                {payment.credit && (
                  <p className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-600" />
                    Credits: <span className="font-medium">{payment.credit}</span>
                  </p>
                )}
                <p className="flex items-center gap-2">
                  {payment.status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  Status:{" "}
                  <span
                    className={
                      payment.status === "success"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {payment.status}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No payment history found.</p>
      )}
    </div>
  )
}

export default PaymentHist
