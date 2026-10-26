// All content comes from the supplied resume/portfolio file. Edit here to update the site.

export const profile = {
  name: "Neeraj Kumar",
  role: "Frontend Web Developer",
  stack: "React.js & WordPress",
  headline: "I build fast, polished websites people enjoy using.",
  subtitle:
    "Frontend web developer crafting responsive React interfaces and conversion-focused WordPress sites, from landing pages to dashboards and learning platforms.",
  email: "neerajsharma9773768835@gmail.com",
  phone: "+91 97737 68835",
  phoneHref: "+919773768835",
  location: "Sangam Vihar, New Delhi, India",
  github: "https://github.com/Neeraj500-ux",
  linkedin: "https://www.linkedin.com/in/neeraj-kumar-091386311",
  // Put your own photo at public/images/profile.jpg – it replaces the placeholder automatically.
  photo: "/images/profile.jpg",
  photoFallback: "/images/profile.svg",
};

export const about = [
  "I'm a web developer who builds fast, responsive, and visually polished websites and web applications. I work with React to create modern, interactive interfaces and WordPress to develop content-driven business websites.",
  "I enjoy transforming ideas and designs into functional web experiences, from conversion-focused landing pages to multi-page dashboards and learning management systems.",
  "I'm continuously improving my skills in advanced React development, TypeScript, and modern frontend architecture.",
];

export const stats = [
  { value: "8", label: "Featured React projects" },
  { value: "14", label: "WordPress projects" },
  { value: "4", label: "Core services" },
];

export const skillGroups = [
  { title: "Frontend Development", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js and JSX", "Responsive Web Design", "Flexbox and CSS Grid"] },
  { title: "React & UI Development", items: ["React Router", "Vite", "Tailwind CSS", "Context API", "Reusable Components", "Animations and Interactive UI"] },
  { title: "WordPress Development", items: ["WordPress", "Elementor and Elementor Pro", "Website Customization", "Landing Page Design", "Responsive Layouts", "Forms and CTA Sections"] },
  { title: "Tools & Platforms", items: ["Git and GitHub", "Vercel", "Firebase", "npm", "VS Code", "Chrome DevTools", "MS Word, Excel and PowerPoint"] },
];

export const strengths = ["Problem Solving", "Fast Learning", "Attention to Detail", "Client-focused Thinking"];

export type Category = "React" | "WordPress" | "Other";

export interface Project {
  name: string;
  category: Category;
  description: string;
  tech: string[];
  live?: string;
  extra?: { label: string; url: string };
}

export const projects: Project[] = [
  { name: "Creative Crew", category: "React", description: "A conversion-focused landing page for coaches, consultants, and trainers, featuring clear messaging, strategic calls to action, and responsive layouts.", tech: ["React", "CSS", "Vercel"], live: "https://landing-page-design-one-woad.vercel.app/" },
  { name: "IGS — Institute Growth Landing Page", category: "React", description: "A Meta Ads landing page for fashion, beauty, and skill-based institutes, designed around student enquiries and mobile-first usability.", tech: ["React", "CSS"], live: "https://igs.creative-crew.in/" },
  { name: "Creative Workspace", category: "React", description: "A role-based team management application with a login interface, dedicated Team Lead panel, and multi-page navigation.", tech: ["React", "React Router", "Vercel"], live: "https://creative-workspace-1.vercel.app/login", extra: { label: "Team Lead panel", url: "https://creative-workspace-1-lxpu.vercel.app/team-lead" } },
  { name: "Skillbridge — Learning Management System", category: "React", description: "A learning management platform featuring Student, Instructor, and Admin portals, course browsing, and a learning-focused interface.", tech: ["React", "React Router", "CSS"], live: "https://skillbridge-neeraj.vercel.app/" },
  { name: "Crestline Cricket", category: "React", description: "A cricket website featuring live-score and commentary sections, match highlights, player statistics, and sports news.", tech: ["React", "CSS", "SEO"], live: "https://bundling-seven.vercel.app/" },
  { name: "Crescendo — Audio Products", category: "React", description: "A premium audio-products website with a modern product showcase and responsive presentation.", tech: ["React", "CSS"], live: "https://set123-ten.vercel.app/" },
  { name: "Counter Dashboard", category: "React", description: "An interactive dashboard built to practise React state management, with increase, decrease, and reset functionality.", tech: ["React", "React Hooks", "CSS"], live: "https://ztyepe-yjue.vercel.app/" },
  { name: "Kinetic — Development Agency Website", category: "React", description: "A single-page agency website featuring a portfolio section, modern UI, SEO metadata, and a responsive layout.", tech: ["React", "CSS", "SEO"], live: "https://premium-agency-69yf.vercel.app/" },

  { name: "Sanjay Singh — Lead Generation", category: "WordPress", description: "A landing page for interior designers, architects, and construction businesses, focused on strategy-call bookings.", tech: ["WordPress", "Elementor"], live: "https://wmt42s0uyfwok.web.anested.com/index.php/lp-28sep-01/" },
  { name: "Global Riverfront — Real Estate", category: "WordPress", description: "A property landing page featuring configurations, pricing, amenities, floor plans, location information, and enquiry forms.", tech: ["WordPress", "Elementor"], live: "https://wmt42s0uyfwok.web.anested.com/index.php/lp25sep-01/" },
  { name: "SRIPADA Institute", category: "WordPress", description: "A spoken-English training landing page featuring demo-booking options, testimonials, and FAQs.", tech: ["WordPress", "Elementor"], live: "https://wmt42s0uyfwok.web.anested.com/index.php/neeraj-19-aug/" },
  { name: "Educationvista", category: "WordPress", description: "An education expo website with visitor and exhibitor registration, event information, testimonials, and contact integration.", tech: ["WordPress", "Elementor"], live: "https://educationvista.in/" },
  { name: "Fibo AI", category: "WordPress", description: "A landing page for AI-powered trading tools and education, featuring product information, testimonials, and messaging-channel calls to action.", tech: ["WordPress", "Elementor"], live: "https://wmt42s0uyfwok.web.anested.com/index.php/lp-22-august1/" },
  { name: "NLP Programme Event", category: "WordPress", description: "An event landing page with programme levels, ticket options, enquiry forms, and mentor information.", tech: ["WordPress", "Elementor"], live: "https://wmt42s0uyfwok.web.anested.com/index.php/new-one-1/" },
  { name: "Chef Ananya — Online Baking Academy", category: "WordPress", description: "A course landing page featuring course packages, student stories, application forms, and FAQs.", tech: ["WordPress", "Elementor"], live: "https://chefananya.in/lp-aug14/" },
  { name: "E-commerce Innova", category: "WordPress", description: "An AI digital marketing course website featuring course modules, pricing, testimonials, and WhatsApp enrolment options.", tech: ["WordPress", "Elementor"], live: "https://ecommerceinnova.in/" },
  { name: "IIVS — Tarot Workshop", category: "WordPress", description: "A workshop registration page with WooCommerce checkout, syllabus details, reviews, and registration features.", tech: ["WordPress", "Elementor", "WooCommerce", "Razorpay"], live: "https://tarot.iivs.in/" },
  { name: "Gurmeet Wahi", category: "WordPress", description: "A community landing page designed to encourage professionals and entrepreneurs to join a free WhatsApp community.", tech: ["WordPress", "Elementor"], live: "https://www.gurmeetwahi.com/01-landing-page/" },
  { name: "RahulAds", category: "WordPress", description: "A Meta Ads audit landing page for D2C brands, featuring the audit process, client feedback, and a booking popup.", tech: ["WordPress", "Elementor"], live: "https://rahulads.in/" },
  { name: "XScale Media", category: "WordPress", description: "A funnel marketing agency website featuring services, case studies, advertising creatives, animated counters, and call-booking functionality.", tech: ["WordPress", "Elementor"], live: "https://xscalemedia.com/" },
  { name: "Rapid Sales Sprint", category: "WordPress", description: "A sales bootcamp webinar landing page featuring a day-wise agenda, coach profile, success stories, and registration functionality.", tech: ["WordPress", "Elementor"], live: "https://webinar.rapidsalessprint.com/ga/" },
  { name: "My Expert Doctor", category: "WordPress", description: "An online consultation and lifestyle health programme website with course information, consultation options, testimonials, and app-download links. Built on Classplus.", tech: ["Classplus"], live: "https://www.myexpertdoctor.com/" },

  { name: "Solar System Animation", category: "Other", description: "An animated solar system using CSS animations and transforms, with responsive layouts and smooth motion effects.", tech: ["HTML", "CSS", "JavaScript"] },
  { name: "Login Page System", category: "Other", description: "A responsive login interface with form validation and user-input handling.", tech: ["HTML", "CSS", "JavaScript"] },
  { name: "ZType Typing Game", category: "Other", description: "An interactive typing game with a responsive interface.", tech: ["HTML", "CSS", "JavaScript"], live: "https://ztyepe-yjue.vercel.app/" },
  { name: "Counter Application", category: "Other", description: "An application to practise state management, event handling, and component rendering.", tech: ["React", "Vite", "JavaScript", "CSS"] },
];

export const additionalReact = [
  { name: "Nick", url: "https://nick12.vercel.app/" },
  { name: "Room", url: "https://room-rosy-phi.vercel.app/" },
  { name: "React Hooks Practice", url: "https://hooks-weld-nu.vercel.app/" },
  { name: "The One", url: "https://the-one-neeraj.vercel.app/" },
];

export const experience = [
  {
    title: "Freelance Frontend Web Developer",
    company: "Web Projects",
    points: [
      "Develop responsive websites using HTML, CSS, JavaScript, and React.",
      "Convert website designs into functional web pages and reusable UI sections.",
      "Customize WordPress and Elementor websites according to project requirements.",
      "Build landing pages and interactive interfaces with a focus on responsive usability.",
    ],
  },
  {
    title: "Document Verification Associate",
    company: "SIS Cash Services Pvt. Ltd., Okhla, New Delhi",
    points: ["Handled document verification processes with accuracy and attention to detail."],
  },
];

export const education = [
  { title: "B.A. (Hons.) Political Science", place: "University of Delhi, School of Open Learning" },
  { title: "Diploma in Web Development", place: "" },
  { title: "Class XII", place: "CBSE" },
  { title: "Class X", place: "CBSE" },
];

export const services = [
  { title: "Frontend Web Development", text: "Responsive websites and interactive React interfaces built with reusable components and modern frontend practices." },
  { title: "WordPress Website Development", text: "Business websites, landing pages, and content-driven websites customized with WordPress and Elementor." },
  { title: "Responsive UI Development", text: "Mobile-friendly layouts, interface refinements, clear content hierarchy, and user-friendly navigation." },
  { title: "Landing Page Development", text: "Structured landing pages with clear messaging, enquiry forms, and calls to action." },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
