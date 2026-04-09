"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Payment, updatePaymentStatus } from "@/lib/payment-service"
import { 
  CheckCircle2Icon, 
  XCircleIcon, 
  UserIcon, 
  BookOpenIcon, 
  CreditCardIcon,
  CalendarIcon,
  FileTextIcon,
  ExternalLink,
  Loader2
} from "lucide-react"
import { toast } from "sonner"

interface PaymentDetailModalProps {
  payment: Payment | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: () => void
}

export function PaymentDetailModal({ 
  payment, 
  isOpen, 
  onClose,
  onUpdate 
}: PaymentDetailModalProps) {
  const [isProcessing, setIsProcessing] = React.useState(false);
  if (!payment) return null

  const handleAction = async (status: "confirmed" | "rejected") => {
    try {
      setIsProcessing(true);
      await updatePaymentStatus(payment._id, status)
      toast.success(`Payment ${status === "confirmed" ? "confirmed" : "rejected"} successfully`)
      if (onUpdate) onUpdate()
      onClose()
      // Refresh data via parent state instead of reload if possible, 
      // but the parent currently uses a refresh callback through onUpdate
    } catch (error) {
       toast.error("Failed to process payment");
    } finally {
       setIsProcessing(false);
    }
  }

  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(payment.amount)

  const formattedDate = payment.transactionDate ? new Date(payment.transactionDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }) : "N/A";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="bg-primary p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <CreditCardIcon className="size-5" />
              Payment Verification
            </DialogTitle>
            <Badge variant="secondary" className="bg-white/20 text-white border-none capitalize">
              {payment.status}
            </Badge>
          </div>
          <DialogDescription className="text-primary-foreground/80 font-medium">
            Review the transaction details and receipt below.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto bg-card">
          {/* Student Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                <UserIcon className="size-3" /> Student Name
              </span>
              <p className="text-sm font-semibold text-foreground">{payment.student?.fullname || payment.student?.name || "Unknown"}</p>
              <p className="text-xs text-muted-foreground">{payment.student?.email || "No email"}</p>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1 justify-end">
                <CalendarIcon className="size-3" /> Submission Date
              </span>
              <p className="text-sm font-semibold text-foreground">{formattedDate}</p>
            </div>
          </div>

          {/* Course & Amount */}
          <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                  <BookOpenIcon className="size-3" /> Course Selected
                </span>
                <p className="text-sm font-bold text-foreground leading-tight">{payment.course?.title || "N/A"}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Amount Paid</span>
                <p className="text-xl font-black text-primary">{formattedAmount}</p>
              </div>
            </div>
          </div>

          {/* Receipt Preview */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
              <FileTextIcon className="size-3" /> Payment Receipt Preview
            </span>
            <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 flex items-center justify-center relative overflow-hidden group">
              {/* Actual Receipt Image */}
              {payment.receiptUrl ? (
                <img 
                  src={payment.receiptUrl} 
                  alt="Payment Receipt"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <FileTextIcon className="size-8" />
                  <span className="text-xs">No receipt uploaded</span>
                </div>
              )}
              {payment.receiptUrl && (
                <div className="relative z-10 bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full border border-primary/20 shadow-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ExternalLink className="size-4 text-primary" />
                   <a href={payment.receiptUrl} target="_blank" className="text-xs font-bold hover:underline">View Full Receipt</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-muted/30 flex-row gap-3 sm:justify-end border-t">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => handleAction("rejected")}
            disabled={payment.status !== "pending" || isProcessing}
          >
            {isProcessing ? <Loader2 className="size-4 animate-spin" /> : <XCircleIcon className="size-4 mr-2" />}
            Reject
          </Button>
          <Button 
            className="flex-1 sm:flex-none rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
            onClick={() => handleAction("confirmed")}
            disabled={payment.status !== "pending" || isProcessing}
          >
            {isProcessing ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2Icon className="size-4 mr-2" />}
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
