import { Award, MapPin, Clock, Star } from "lucide-react";

const stats = [
  { icon: Award, label: "Accredited Courses", value: "25+" },
  { icon: MapPin, label: "UK Locations", value: "50+" },
  { icon: Clock, label: "Same Day Results", value: "Fast" },
  { icon: Star, label: "Student Rating", value: "4.9/5" },
];

const StatsBar = () => {
  return (
    <section className="border-b bg-card py-8">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
