import courseDoor from "@/assets/course-door.jpg";
import courseSupervisor from "@/assets/course-supervisor.jpg";
import courseCctv from "@/assets/course-cctv.jpg";
import courseFirstaid from "@/assets/course-firstaid.jpg";
import courseCloseprotection from "@/assets/course-closeprotection.jpg";
import courseGuard from "@/assets/course-guard.jpg";
import courseConflict from "@/assets/course-conflict.jpg";

export const courses = [
  {
    id: 1,
    slug: "sia-door-supervisor",
    title: "SIA Door Supervisor Training",
    category: "Security",
    duration: "6 Days",
    students: "3,200+",
    price: "£0",
    image: courseDoor,
    badge: "Most Popular",
    description: "The SIA Door Supervisor course is the standard requirement for anyone looking to work as a security guard or door supervisor in the UK. This comprehensive training covers everything from behavioral standards to emergency procedures.",
    includes: [
      "SIA Accredited Certification",
      "Comprehensive Study Materials",
      "Physical Intervention Training",
      "Job Placement Support"
    ],
    modules: [
      { id: "m1", title: "Working in the Private Security Industry", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "Working as a Door Supervisor", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" },
      { id: "m3", title: "Conflict Management", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m4", title: "Physical Intervention", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ]
  },
  {
    id: 2,
    slug: "sia-door-supervisor-refresher",
    title: "SIA Door Supervisor Refresher Course",
    category: "Security",
    duration: "6 Days",
    students: "3,200+",
    price: "£0",
    image: courseSupervisor,
    badge: "Most Popular",
    description: "The SIA Door Supervisor Refresher course is designed for existing license holders who need to renew their skills and stay compliant with the latest industry standards and regulations.",
    includes: [
      "SIA Accredited Certification",
      "Comprehensive Study Materials",
      "Physical Intervention Training",
      "Job Placement Support"
    ],
    modules: [
      { id: "m1", title: "Updated Industry Regulations", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "Refresher: Behavioral Standards", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" },
      { id: "m3", title: "Refresher: Conflict Management", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m4", title: "Refresher: Physical Intervention", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ]
  },
  {
    id: 3,
    slug: "cctv-operator",
    title: "CCTV Operator Course",
    category: "Surveillance",
    duration: "3 Days",
    students: "1,850+",
    price: "£0",
    image: courseCctv,
    description: "Launch your career in surveillance with our SIA-accredited CCTV Operator course. Learn to monitor public spaces and private property using the latest technology.",
    includes: [
      "Professional Certification",
      "Hands-on equipment training",
      "Technical operational guide"
    ],
    modules: [
      { id: "m1", title: "Principles of CCTV Systems", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "Privacy and GDPR", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" },
      { id: "m3", title: "Detailed Note Taking", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" }
    ]
  },
  {
    id: 4,
    slug: "emergency-first-aid",
    title: "Emergency First Aid at Work",
    category: "First Aid",
    duration: "1 Day",
    students: "5,100+",
    price: "£0",
    image: courseFirstaid,
    badge: "Best Value",
    description: "Essential life-saving skills for any workplace. This one-day course is a prerequisite for many SIA licenses and is highly valued by employers.",
    includes: [
      "HSE Recognized Certificate",
      "First Aid Manual",
      "Practical Skills Session"
    ],
    modules: [
      { id: "m1", title: "Initial Assessment (DRSABCD)", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "CPR Techniques for Adults", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m3", title: "Managing Major Trauma", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" },
      { id: "m4", title: "Record Keeping & RIDDOR", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" }
    ]
  },
  {
    id: 5,
    slug: "close-protection",
    title: "Close Protection Officer",
    category: "Security",
    duration: "15 Days",
    students: "720+",
    price: "£0",
    image: courseCloseprotection,
    description: "Elite level training for high-threat environments. Become an executive protection specialist with our intensive 15-day residential program.",
    includes: [
      "Advanced Certification",
      "Scenario-based training",
      "Elite network access"
    ],
    modules: [
      { id: "m1", title: "Advanced Tactics & Route Planning", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "Executive Protection Protocols", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" },
      { id: "m3", title: "Threat Assessment", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ]
  },
  {
    id: 6,
    slug: "security-guard-refresher",
    title: "Security Guard Refresher",
    category: "Top-Up",
    duration: "2 Days",
    students: "2,400+",
    price: "£0",
    image: courseGuard,
    description: "Required 'Top-Up' training for existing license holders to ensure compliance with the latest industry standards.",
    includes: [
      "License renewal eligibility",
      "New standards manual"
    ],
    modules: [
      { id: "m1", title: "Modern Threats & Terrorism Awareness", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "Equipment Update: Body-worn Cameras", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ]
  },
  {
    id: 7,
    slug: "conflict-management",
    title: "Conflict Management Training",
    category: "Security",
    duration: "1 Day",
    students: "1,600+",
    price: "£0",
    image: courseConflict,
    description: "Specialized training in verbal de-escalation and risk management. Essential for front-line security and hospitality staff.",
    includes: [
      "Certification",
      "Communication Toolkit"
    ],
    modules: [
      { id: "m1", title: "Stress Response (Flight/Fight)", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "m2", title: "Strategic Communication", type: "pdf", content: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" },
      { id: "m3", title: "POPS Model", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ]
  }
];
