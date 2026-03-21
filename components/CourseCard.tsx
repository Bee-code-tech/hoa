import { Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <Link href={showProgress ? `/dashboard/courses/${slug}` : `/courses/${slug}`} className="group relative block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img src={typeof image === "string" ? image : image.src} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {badge && (
          <span className="absolute left-3 top-3 rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5">
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

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">{price}</span>
          <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary p-0 h-auto">
            {showProgress ? "Continue" : "View Course"} <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
