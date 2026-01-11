import {
  Phone,
  MapPin,
  Users,
  Facebook,
  X,
  Twitter,
  LinkedinIcon,
  Youtube,
  Instagram,
  TwitterIcon,
  Linkedin,
} from "lucide-react"; // For Contact, Location, Community icons

function Footer() {
  return (
    <footer className="bg-white border-t py-12  text-gray-600 text-lg">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">

        {/* ---------------- Column 1 ---------------- */}
        <div className="space-y-6">
          {/* Contact Us */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-teal-600 mt-1" />
            <div>
              <h4 className="font-semibold mb-1 text-xl text-teal-600">Contact Us</h4>
              <p>+44 123 456 7890</p>
            </div>
          </div>

          {/* Head Office */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-teal-600 mt-1 " />
            <div>
              <h4 className="font-semibold mb-1 text-xl text-teal-600">Head Office</h4>
              <p>123 Hurak Street, London, UK</p>
            </div>
          </div>

          {/* General Community */}
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-teal-600 mt-1" />
            <div>
              <h4 className="font-semibold mb-1 text-xl text-teal-600">General Community</h4>
              <div className="flex gap-4 mt-1">
                {/* Replace # with your social links */}
                <a href="#" className="hover:text-teal-600"><Facebook/></a>
                <a href="#" className="hover:text-teal-600"><TwitterIcon/></a>
                <a href="#" className="hover:text-teal-600"><Linkedin/></a>
                <a href="#" className="hover:text-teal-600"><Youtube/></a>
                <a href="#" className="hover:text-teal-600"><Instagram/></a>
              </div>
            </div>
          </div>

          {/* Trusted Across Industries */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-teal-600 text-xl">Trusted Across Industries</h4>
            <div className="flex gap-3">
              <img
                src="/trusted1.png"
                alt="Trusted 1"
                className="h-8 object-contain"
              />
              <img
                src="/trusted2.png"
                alt="Trusted 2"
                className="h-8 object-contain"
              />
              <img
                src="/trusted3.png"
                alt="Trusted 3"
                className="h-8 object-contain"
              />
              <img
                src="/trusted4.png"
                alt="Trusted 4"
                className="h-8 object-contain"
              />
            </div>
          </div>
        </div>

        {/* ---------------- Column 2 ---------------- */}
        <div className="space-y-6">
          {/* Find a Course */}
          <div>
            <h4 className="font-semibold mb-2 text-teal-600 text-xl">Find a Course</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">All Courses</a></li>
              <li><a href="#" className="hover:text-teal-600">Classroom Courses</a></li>
              <li><a href="#" className="hover:text-teal-600">On Demand Courses</a></li>
              <li><a href="#" className="hover:text-teal-600">Live Online Courses</a></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-semibold mb-2 text-xl text-teal-600">More</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">List Your Course</a></li>
              <li><a href="#" className="hover:text-teal-600">Skill Saver Program</a></li>
              <li><a href="#" className="hover:text-teal-600">Provider Skill Saver Program</a></li>
              <li><a href="#" className="hover:text-teal-600">Verify Certificates</a></li>
            </ul>
          </div>
        </div>

        {/* ---------------- Column 3 ---------------- */}
        <div className="space-y-6">
          {/* Popular Categories */}
          <div>
            <h4 className="font-semibold mb-2 text-teal-600 text-xl">Popular Categories</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">CITB Site Safety Plus</a></li>
              <li><a href="#" className="hover:text-teal-600">Personal License</a></li>
              <li><a href="#" className="hover:text-teal-600">First Aid</a></li>
              <li><a href="#" className="hover:text-teal-600">Health and Safety Security</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-2 text-teal-600 text-xl">Resources</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">Blog</a></li>
              <li><a href="#" className="hover:text-teal-600">Desk Prep</a></li>
              <li><a href="#" className="hover:text-teal-600">Heroic Business</a></li>
            </ul>
          </div>
        </div>

        {/* ---------------- Column 4 ---------------- */}
        <div className="space-y-6">
          {/* Popular Courses */}
          <div>
            <h4 className="font-semibold mb-2 text-teal-600 text-xl">Popular Courses</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">CS Green Card Training</a></li>
              <li><a href="#" className="hover:text-teal-600">Personal License</a></li>
              <li><a href="#" className="hover:text-teal-600">Traffic Marshall</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-2 text-teal-600 text-xl">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-teal-600">About Us</a></li>
              <li><a href="#" className="hover:text-teal-600">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        © Hurak 2026. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
