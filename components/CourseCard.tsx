"use client";

import { Clock, Users, ArrowRight, BookOpen, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type PaymentStatus = "enrolled" | "pending" | "none";

interface CourseCardProps {
  slug: string;
  title: string;
  category: string;
  duration: string;
  students: string;
  price: number;
  imageUrl: string;
  badge?: string;
  progress?: number;
  // Legacy prop — still supported for the landing page (no auth context)
  showProgress?: boolean;
  // Backend-injected field. When present, this drives all behaviour.
  paymentStatus?: PaymentStatus;
}

const CourseCard = ({
  slug,
  title,
  category,
  duration,
  students,
  price,
  imageUrl,
  badge,
  progress,
  showProgress,
  paymentStatus,
}: CourseCardProps) => {
  const isFree = price === 0;
  let destination: string;

  if (paymentStatus === "enrolled" || (showProgress && !paymentStatus)) {
    // Student has paid and been confirmed → go to course player
    destination = `/dashboard/courses/${slug}`;
  } else if (paymentStatus === "pending") {
    // Awaiting admin review → not clickable to course player
    destination = `/courses/${slug}`;
  } else if (paymentStatus === "none") {
    // Dashboard context, not enrolled. Free courses can be started immediately.
    destination = isFree ? `/dashboard/courses/${slug}` : `/courses/${slug}`;
  } else {
    // Landing page — Free courses go to dashboard to enrol, paid ones go to details
    destination = isFree ? `/dashboard/courses/${slug}` : `/courses/${slug}`;
  }

  // ── CTA Button ────────────────────────────────────────────────────────────
  const ctaButton = (() => {
    // 1. Enrolled or legacy progress
    if (paymentStatus === "enrolled" || (showProgress && !paymentStatus)) {
      return (
        <Button variant="default" size="sm" className="gap-1 bg-primary">
          <BookOpen className="h-3.5 w-3.5" /> Start Course
        </Button>
      );
    }

    // 2. Pending Review
    if (paymentStatus === "pending") {
      return (
        <Badge
          variant="secondary"
          className="gap-1 bg-amber-100 text-amber-700 border-amber-300 cursor-default"
        >
          <Hourglass className="h-3 w-3" /> Pending Review
        </Badge>
      );
    }

    // 3. Free Course (not enrolled yet)
    if (isFree) {
      const label = paymentStatus ? "Start Course" : "Enroll Now";
      return (
        <Button variant="default" size="sm" className="gap-1 bg-primary">
          {paymentStatus && <BookOpen className="h-3.5 w-3.5" />}
          {label} {!paymentStatus && <ArrowRight className="h-3.5 w-3.5" />}
        </Button>
      );
    }

    // 4. Paid Course (not enrolled / landing page)
    return (
      <Button variant="default" size="sm" className="gap-1">
        View Details <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    );
  })();

  // ── Card body ─────────────────────────────────────────────────────────────
  const cardContent = (
    <div className="group relative block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {badge}
          </span>
        )}
        {paymentStatus === "enrolled" && (
          <span className="absolute right-3 top-3 rounded-md bg-green-600 px-2.5 py-1 text-xs font-semibold text-white">
            Enrolled
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

        {/* Progress bar — only for enrolled courses with progress data */}
        {paymentStatus === "enrolled" && progress !== undefined && (
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Legacy progress bar (when paymentStatus not available) */}
        {!paymentStatus && showProgress && progress !== undefined && (
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-foreground">
            {isFree ? "Free" : `£${price}`}
          </span>
          {ctaButton}
        </div>
      </div>
    </div>
  );

  // Pending cards: card is NOT a link (student can't access player)
  if (paymentStatus === "pending") {
    return <div className="h-full opacity-90">{cardContent}</div>;
  }

  return (
    <Link href={destination} className="block h-full">
      {cardContent}
    </Link>
  );
};

export default CourseCard;
