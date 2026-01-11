import { Tag, MapPin, Zap } from "lucide-react";

function TrustBadges() {
  const items = [
    {
      title: "Price Match Guarantee",
      desc: "Browse with confidence we’ll meet or beat any of our competitor’s prices",
      icon: Tag,
    },
    {
      title: "Nationwide Coverage",
      desc: "Local and nationwide coverage so that you can get trained no matter where you are.",
      icon: MapPin,
    },
    {
      title: "Same Day Results",
      desc: "Benefit from instant results for most of our courses",
      icon: Zap,
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
        {items.map(({ title, desc, icon: Icon }) => (
          <div key={title} className="flex gap-4 items-start">
            {/* Icon */}
            <div className="">
              <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center">
                <Icon className="text-blue-900" size={22} />
              </div>
            </div>

            {/* Text */}
            <div>
              <h4 className="font-bold text-lg text-gray-900">
                {title}
              </h4>
              <p className="mt-1 text-gray-600 text-lg leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBadges;
