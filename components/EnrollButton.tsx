"use client";

import { useState, useEffect } from "react";
import { 
  Building, 
  MapPin, 
  Phone, 
  Loader2, 
  Copy, 
  Check, 
  Upload, 
  FileText, 
  X,
  CreditCard,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { uploadService } from "@/services/upload.service";
import { createPayment } from "@/lib/payment-service";
import { authUtils } from "@/lib/auth-utils";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface EnrollButtonProps {
  courseId: string;
  courseTitle: string;
  coursePrice: string;
  paymentStatus?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export default function EnrollButton({ 
  courseId,
  courseTitle, 
  coursePrice, 
  paymentStatus,
  className, 
  variant = "default", 
  size = "default",
  children 
}: EnrollButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isCopying, setIsCopying] = useState<string | null>(null);
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setIsCopying(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setIsCopying(null), 2000);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 20 * 1024 * 1024) {
      toast.error("File is too large (max 20MB)");
      return;
    }

    setFile(selectedFile);
    
    // Create local preview if it's an image
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null); // Clear image preview for PDFs
    }
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
      setUploadProgress(0);
      
      const receiptUrl = await uploadService.uploadFile(file, (pct) => {
        setUploadProgress(pct);
      });
      
      const numericalPrice = parseFloat(coursePrice.replace(/[^0-9.]/g, ""));

      await createPayment({
        courseId,
        amount: numericalPrice || 0,
        receiptUrl,
      });

      toast.success("Payment submitted! Awaiting admin approval.");
      setIsOpen(false);
      setFile(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      router.refresh();
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

  if (paymentStatus === "pending") {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Pending Approval
      </Button>
    );
  }

  if (paymentStatus === "enrolled" || paymentStatus === "confirmed" || paymentStatus === "paid") {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <ShieldCheck className="mr-2 h-4 w-4" /> Enrolled
      </Button>
    );
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={handleEnrollClick}>
        {children || "Enroll Now"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl p-0 gap-0 overflow-hidden border-none shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column: Instructions & Bank Details */}
            <div className="p-8 lg:p-10 bg-muted/30 border-r">
              <DialogHeader className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1.5 py-1 px-3">
                    <ShieldCheck className="size-3.5" /> Direct Enrollment
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Payment Instructions</DialogTitle>
                <DialogDescription className="text-base">
                  Please complete the bank transfer for <span className="font-bold text-foreground">£{coursePrice}</span> to secure your place.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative p-6 rounded-2xl bg-card border shadow-sm ring-1 ring-primary/5">
                  <div className="absolute top-0 right-0 p-3">
                    <CreditCard className="size-5 text-primary/40" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Bank Details</h4>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1 group">
                      <Label className="text-xs text-muted-foreground">Account Name</Label>
                      <div className="flex items-center justify-between">
                         <span className="font-bold text-sm">HOUSE OF ABUNDANCE SERVICES LTD</span>
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           onClick={() => copyToClipboard("HOUSE OF ABUNDANCE SERVICES LTD", "Account Name")}
                           className="size-8 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                         >
                           {isCopying === "Account Name" ? <Check className="size-4" /> : <Copy className="size-4" />}
                         </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs text-muted-foreground">Account Number</Label>
                        <div className="flex items-center justify-between">
                           <span className="font-bold font-mono">99860083</span>
                           <Button 
                             variant="ghost" 
                             size="icon" 
                             onClick={() => copyToClipboard("99860083", "Account Number")}
                             className="size-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                           >
                             {isCopying === "Account Number" ? <Check className="size-4" /> : <Copy className="size-4" />}
                           </Button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs text-muted-foreground">Sort Code</Label>
                        <div className="flex items-center justify-between">
                           <span className="font-bold font-mono">04-00-03</span>
                           <Button 
                             variant="ghost" 
                             size="icon" 
                             onClick={() => copyToClipboard("04-00-03", "Sort Code")}
                             className="size-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                           >
                             {isCopying === "Sort Code" ? <Check className="size-4" /> : <Copy className="size-4" />}
                           </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Venue</p>
                      <p className="text-sm font-medium">101 Lockhurst Lane<br/>Coventry, CV6 5SF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Support</p>
                      <p className="text-sm font-medium">+44 7776 727184</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Evidence Upload */}
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold mb-1">Confirm Enrollment</h4>
                <p className="text-sm text-muted-foreground mb-6">Upload a photo or PDF of your bank transfer receipt.</p>

                <div className="space-y-6">
                  <div className={cn(
                    "relative group border-2 border-dashed rounded-2xl p-8 transition-all hover:border-primary/50 hover:bg-primary/[0.02] flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden",
                    file && "border-green-500/50 bg-green-500/[0.01]"
                  )}>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      accept="image/*,.pdf"
                      onChange={onFileSelect}
                    />
                    
                    {!file ? (
                      <div className="space-y-3">
                        <div className="mx-auto size-12 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                          <Upload className="size-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Select Receipt</p>
                          <p className="text-xs text-muted-foreground">JPG, PNG or PDF (Max 20MB)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full space-y-4">
                        <div className="flex items-center justify-center gap-3">
                          {file.type.includes("pdf") ? (
                            <div className="size-20 bg-muted rounded-xl flex items-center justify-center">
                              <FileText className="size-10 text-primary" />
                            </div>
                          ) : (
                            previewUrl && (
                              <div className="relative size-32 rounded-xl overflow-hidden border shadow-sm">
                                <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                              </div>
                            )
                          )}
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold truncate max-w-[200px]">{file.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          <X className="size-3 mr-1" /> Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                       <div className="flex items-center justify-between text-xs font-medium">
                          <span>Uploading evidence...</span>
                          <span>{uploadProgress}%</span>
                       </div>
                       <Progress value={uploadProgress} className="h-1.5" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <Button 
                  className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 gap-2" 
                  onClick={handlePayment}
                  disabled={!file || isUploading}
                >
                  {isUploading ? <Loader2 className="size-5 animate-spin" /> : <ExternalLink className="size-5" />}
                  Confirm Enrollment
                </Button>
                <p className="text-[10px] text-center text-muted-foreground px-6 leading-relaxed">
                  By clicking confirm, you agree that your payment will be reviewed by our team. Enrollment is typically confirmed within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

