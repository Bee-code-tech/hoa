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
}

const CourseCard = ({ slug, title, category, duration, students, price, image, badge }: CourseCardProps) => {
  return (
    <Link href={`/courses/${slug}`} className="group relative block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img src={typeof image === "string" ? image : image.src} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {badge && (
          <span className="absolute left-3 top-3 rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">{category}</p>
        <h3 className="mb-3 text-lg font-bold leading-snug text-card-foreground">{title}</h3>
        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{duration}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{students}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">{price}</span>
          <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
            View Course <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
