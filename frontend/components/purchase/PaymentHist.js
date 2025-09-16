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
    <div className="  p-6 w-full bg-background max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
        <FileText className="w-6 h-6 text-primary" />
        Recent Payment History
      </h1>

      {payments && payments.length > 0 ? (
        <ul className="space-y-4">
          {payments.map((payment, idx) => (
            <li
              key={payment._id || idx}
              className="bg-background/60 p-4 transition-colors duration-200"
            >
              {/* Top Row: Plan + Date */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg capitalize text-primary">
                  {payment.plan}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(payment.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Payment Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>Payment ID:</span> <span className="font-medium">{payment.paymentId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>Order ID:</span> <span className="font-medium">{payment.orderId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-success-600" />
                  <span>Amount:</span>
                  <span className="font-medium">
                    {payment.amount / 100} {payment.currency}
                  </span>
                </div>
                {payment.credit && (
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-accent-500" />
                    <span>Credits:</span> <span className="font-medium">{payment.credit}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {payment.status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-success-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive" />
                  )}
                  <span>Status:</span>
                  <span
                    className={`font-medium ${
                      payment.status === "success" ? "text-success-600" : "text-destructive"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          No payment history found. Start by purchasing some credits!
        </p>
      )}
    </div>
  )
}

export default PaymentHist