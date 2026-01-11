import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- DATA ---------------- */
const CAROUSEL_COURSES = [
  {
    id: 1,
    title: "Level One Award in Health and Safety in the Construction Environment",
    providers: ["4 Course Providers", ],
    price: "€89.99",
    image: "https://hurak.com/_next/image?url=https%3A%2F%2Fhu…3f16b_iosh-managing-safely-course.webp&w=640&q=75",
    description: "Comprehensive course covering essential health & safety practices.",
  },
  {
    id: 2,
    title: "Door Supervisor Training Course",
    providers: ["3 Course Providers"],
    price: "€129.99",
    image: "https://hurak.com/_next/image?url=https%3A%2F%2Fhu…3f16b_iosh-managing-safely-course.webp&w=640&q=75",
    description: "Become a certified door supervisor with our expert trainers.",
  },
  {
    id: 3,
    title: "Emergency First Aid at Work",
    providers: ["2 Course providers"],
    price: "€59.99",
    image: "https://images.unsplash.com/photo-1580281658629-ff99c75f4b8a",
    description: "Learn essential emergency first aid skills for the workplace.",
  },
  {
    id: 4,
    title: "CSCS Green Card Training",
    providers: ["2 Course providers"],
    price: "€99.99",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    description: "Get your CSCS Green Card and work safely on construction sites.",
  },
  {
    id: 5,
    title: "Train the Trainer Course",
    providers: ["2 Course providers"],
    price: "€199.99",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    description: "Become a certified trainer to deliver professional courses.",
  },
  {
    id: 6,
    title: "Fire Safety Training",
    providers: ["2 Course providers"],
    price: "€79.99",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    description: "Master fire safety procedures and workplace prevention skills.",
  },
  {
    id: 7,
    title: "Workplace Security Awareness",
    providers: ["2 Course providers"],
    price: "€129.99",
    image: "https://images.unsplash.com/photo-1581090700227-8d2c7d2a63b8",
    description: "Understand security risks and implement effective measures.",
  },
  {
    id: 8,
    title: "Advanced First Aid",
    providers: ["2 Course providers"],
    price: "€159.99",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
    description: "Advanced techniques for handling critical medical situations.",
  },
];

/* ---------------- COMPONENT ---------------- */
export default function CourseShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-1">
          HOA – Training Courses & Qualifications
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          With over 100,000 customers, from individuals to global brands.
        </p>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2"
          >
            <ChevronLeft />
          </button>

          {/* Carousel Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar px-4 scroll-smooth cursor-grab"
          >
            {CAROUSEL_COURSES.map((course) => (
              <div
                key={course.id}
                className="relative min-w-74 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />

                {/* Title, Providers, Price */}
                <div className="p-4 flex flex-col gap-2">
                  <h1 className="font-bold text-lg">{course.title}</h1>

                  <div className="flex gap-2">
                    {course.providers.map((p, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="font-semibold text-blue-900">{course.price}</div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white flex flex-col justify-center items-start p-6 opacity-0 hover:opacity-100 transition-all duration-300 hover:translate-y-0 translate-y-4">
                  <h1 className="font-bold text-xl mb-2">{course.title}</h1>
                  <div className="flex gap-2 mb-2">
                    {course.providers.map((p, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="font-semibold text-lg mb-2">{course.price}</div>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
