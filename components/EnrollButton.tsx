"use client";

import { useState, useEffect } from "react";
import { Building, MapPin, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadService } from "@/services/upload.service";
import { createPayment } from "@/lib/payment-service";
import { authUtils } from "@/lib/auth-utils";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

interface EnrollButtonProps {
  courseTitle: string;
  coursePrice: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export default function EnrollButton({ 
  courseTitle, 
  coursePrice, 
  className, 
  variant = "default", 
  size = "default",
  children 
}: EnrollButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnrollClick = () => {
    if (!authUtils.isAuthenticated()) {
      toast.error("You must be logged in to enroll");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setIsOpen(true);
  };

  const handlePayment = async () => {
    if (!file) {
      toast.error("Please upload a receipt first.");
      return;
    }

    const auth = authUtils.getAuth();
    if (!auth || !auth.user) {
      toast.error("You must be logged in to enroll");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      setIsUploading(true);
      const receiptUrl = await uploadService.uploadFile(file);
      
      const numericalPrice = parseFloat(coursePrice.replace(/[^0-9.]/g, ""));

      createPayment({
        studentName: auth.user.name || "Student",
        studentEmail: auth.user.email,
        courseTitle,
        amount: numericalPrice || 0,
        receiptUrl,
      });

      toast.success("Payment submitted! Awaiting admin approval.");
      setIsOpen(false);
      setFile(null);
    } catch (error) {
      toast.error("Failed to upload receipt or submit payment");
    } finally {
      setIsUploading(false);
    }
  };

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className={className}>
        {children || "Enroll Now"}
      </Button>
    );
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={handleEnrollClick}>
        {children || "Enroll Now"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enroll in {courseTitle}</DialogTitle>
            <DialogDescription>
              To secure your place, please make a bank transfer using the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-muted p-4 rounded-lg space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">HOUSE OF ABUNDANCE SERVICES LTD</p>
                  <p className="text-sm text-foreground/80">Account Number: <span className="font-medium text-foreground">99860083</span></p>
                  <p className="text-sm text-foreground/80">Sort Code: <span className="font-medium text-foreground">04-00-03</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Training Venue</p>
                  <p className="text-sm text-muted-foreground">101 Lockhurst Lane<br/>Coventry, CV6 5SF</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">Contact Support</p>
                  <p className="text-sm text-muted-foreground">+44 7776 727184</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label htmlFor="receipt">Upload Payment Receipt</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="receipt" 
                  type="file" 
                  accept="image/*,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button 
                className="w-full mt-2" 
                onClick={handlePayment}
                disabled={!file || isUploading}
              >
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
