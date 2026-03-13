import courseDoor from "@/assets/course-door.jpg";
import courseCctv from "@/assets/course-cctv.jpg";
import courseFirstaid from "@/assets/course-firstaid.jpg";
import courseCloseprotection from "@/assets/course-closeprotection.jpg";
import courseGuard from "@/assets/course-guard.jpg";
import courseConflict from "@/assets/course-conflict.jpg";

export const courses = [
  {
    slug: "sia-door-supervisor",
    title: "SIA Door Supervisor Training",
    category: "Security",
    duration: "6 Days",
    students: "3,200+",
    price: "£220",
    image: courseDoor,
    badge: "Most Popular",
    description: "The SIA Door Supervisor course is the standard requirement for anyone looking to work as a security guard or door supervisor in the UK. This comprehensive training covers everything from behavioral standards to emergency procedures.",
    syllabus: [
      { title: "Unit 1: Working in the Private Security Industry", content: "Understanding the legal aspects, health and safety, and communication skills required for the role." },
      { title: "Unit 2: Working as a Door Supervisor", content: "Behavioral standards, access control, and search procedures." },
      { title: "Unit 3: Conflict Management", content: "Recognizing and defusing potentially violent situations safely." },
      { title: "Unit 4: Physical Intervention", content: "Escorting and restrictive positioning skills as a last resort." }
    ],
    requirements: [
      "Must be 18+ years of age",
      "Valid identity documents",
      "Level 1 English qualification",
      "Emergency First Aid at Work certificate"
    ],
    includes: [
      "SIA Accredited Certification",
      "Comprehensive Study Materials",
      "Physical Intervention Training",
      "Job Placement Support"
    ]
  },
  {
    slug: "cctv-operator",
    title: "CCTV Operator Course",
    category: "Surveillance",
    duration: "3 Days",
    students: "1,850+",
    price: "£180",
    image: courseCctv,
    description: "Launch your career in surveillance with our SIA-accredited CCTV Operator course. Learn to monitor public spaces and private property using the latest technology.",
    syllabus: [
      { title: "Unit 1: Private Security Industry", content: "Legal framework and operational standards." },
      { title: "Unit 2: CCTV Operations", content: "Camera controls, recording equipment, and surveillance techniques." }
    ],
    requirements: [
      "Must be 18+ years of age",
      "Clean criminal record (DBS check)"
    ],
    includes: [
      "Professional Certification",
      "Hands-on equipment training",
      "Technical operational guide"
    ]
  },
  {
    slug: "emergency-first-aid",
    title: "Emergency First Aid at Work",
    category: "First Aid",
    duration: "1 Day",
    students: "5,100+",
    price: "£90",
    image: courseFirstaid,
    badge: "Best Value",
    description: "Essential life-saving skills for any workplace. This one-day course is a prerequisite for many SIA licenses and is highly valued by employers.",
    syllabus: [
      { title: "Unit 1: Basic Life Support", content: "CPR, AED usage, and recovery position." },
      { title: "Unit 2: Common Injuries", content: "Treating burns, fractures, and minor wounds." }
    ],
    requirements: ["None"],
    includes: [
      "HSE Recognized Certificate",
      "First Aid Manual",
      "Practical Skills Session"
    ]
  },
  {
    slug: "close-protection",
    title: "Close Protection Officer",
    category: "Security",
    duration: "15 Days",
    students: "720+",
    price: "£1,500",
    image: courseCloseprotection,
    description: "Elite level training for high-threat environments. Become an executive protection specialist with our intensive 15-day residential program.",
    syllabus: [
      { title: "Advanced Tactics", content: "Route planning, threat assessment, and team movements." },
      { title: "Executive Protection", content: "Protocol, etiquette, and high-net-worth client care." }
    ],
    requirements: [
      "Background in security or military (recommended)",
      "High level of physical fitness"
    ],
    includes: [
      "Advanced Certification",
      "Scenario-based training",
      "Elite network access"
    ]
  },
  {
    slug: "security-guard-refresher",
    title: "Security Guard Refresher",
    category: "Top-Up",
    duration: "2 Days",
    students: "2,400+",
    price: "£120",
    image: courseGuard,
    description: "Required 'Top-Up' training for existing license holders to ensure compliance with the latest industry standards.",
    syllabus: [
      { title: "Unit 1: Modern Threats", content: "Terrorism awareness and current security risks." },
      { title: "Unit 2: Equipment Update", content: "Using body-worn cameras and digital reporting." }
    ],
    requirements: ["Existing SIA Security License"],
    includes: ["License renewal eligibility", "New standards manual"]
  },
  {
    slug: "conflict-management",
    title: "Conflict Management Training",
    category: "Security",
    duration: "1 Day",
    students: "1,600+",
    price: "£95",
    image: courseConflict,
    description: "Specialized training in verbal de-escalation and risk management. Essential for front-line security and hospitality staff.",
    syllabus: [
      { title: "Psychology of Conflict", content: "Understanding triggers and behavioral patterns." },
      { title: "Verbal Judo", content: "Tactical communication and de-escalation scripts." }
    ],
    requirements: ["None"],
    includes: ["Certification", "Communication Toolkit"]
  }
];
