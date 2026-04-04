"use client";

import { useState } from "react";
import { Clock, Users, ArrowRight, Building, MapPin, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadService } from "@/services/upload.service";
import { createPayment } from "@/lib/payment-service";
import { authUtils } from "@/lib/auth-utils";
import { toast } from "react-hot-toast";

interface CourseCardProps {
  slug: string;
  title: string;
  category: string;
  duration: string;
  students: string;
  price: string;
  image: string | { src: string };
  badge?: string;
  progress?: number;
  showProgress?: boolean;
}

const CourseCard = ({ slug, title, category, duration, students, price, image, badge, progress, showProgress }: CourseCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePayment = async () => {
    if (!file) {
      toast.error("Please upload a receipt first.");
      return;
    }

    const auth = authUtils.getAuth();
    if (!auth || !auth.user) {
      toast.error("You must be logged in to enroll");
      return;
    }

    try {
      setIsUploading(true);
      const receiptUrl = await uploadService.uploadFile(file);
      
      const numericalPrice = parseFloat(price.replace(/[^0-9.]/g, ""));

      createPayment({
        studentName: auth.user.name || "Student",
        studentEmail: auth.user.email,
        courseTitle: title,
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

  const cardContent = (
    <div className="group relative block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img src={typeof image === "string" ? image : image.src} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {badge && (
          <span className="absolute left-3 top-3 rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">{category}</p>
        <h3 className="mb-2 text-lg font-bold leading-snug text-card-foreground line-clamp-1">{title}</h3>
        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{duration}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{students}</span>
        </div>
        
        {showProgress && progress !== undefined && (
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-foreground">{price}</span>
          {showProgress ? (
            <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary p-0 h-auto">
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="gap-1">
                  Enroll Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enroll in {title}</DialogTitle>
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
          )}
        </div>
      </div>
    </div>
  );

  if (showProgress) {
    return <Link href={`/dashboard/courses/${slug}`}>{cardContent}</Link>;
  }

  // Wrapped in a div instead of a Link so clicking the card/button doesn't trigger unexpected navigation, since they should enroll via modal
  return <div>{cardContent}</div>;
};

export default CourseCard;
