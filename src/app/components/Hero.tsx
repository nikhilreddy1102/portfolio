import { Mail } from "lucide-react";
import Link from "next/link";
import BackgroundSpotlight from "./BackgroundSpotlight";
import Projects from "./Projects";
import Contact from "./Contact";

/* ✅ Circular badge */
function CircularBadge() {
  return (
    <Link
      href="/experience"
      aria-label="Go to Experience"
      className="
        group w-28 h-28 mx-auto mt-6
        lg:absolute lg:right-20 lg:top-32
        lg:w-40 lg:h-40 rounded-full select-none
      "
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_6px_20px_rgba(0,0,0,.35)]">
        <circle
          cx="100"
          cy="100"
          r="84"
          className="fill-[rgba(255,255,255,0.06)] stroke-[rgba(255,255,255,0.25)]"
          strokeWidth="1.5"
        />
        <defs>
          <path id="expPath" d="M100,100 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
        </defs>
        <g className="origin-center animate-[spin_12s_linear_infinite] group-hover:[animation-duration:6s]">
          <text fontSize="13" fontWeight="600" className="fill-white/80 tracking-[0.25em] uppercase">
            <textPath href="#expPath" startOffset="0%">
              My Experience • My Experience •
            </textPath>
          </text>
        </g>
        <g>
          <circle cx="100" cy="100" r="28" className="fill-white" />
          <path
            d="M88 100 L112 100 M104 92 L112 100 L104 108"
            className="stroke-black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </Link>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center relative">
      {/* Background */}
      <BackgroundSpotlight />

      {/* Hero grid */}
      <div
        className="
          mx-auto max-w-6xl
          px-4 sm:px-6 md:px-8
          py-12 sm:py-16 lg:py-24
          grid grid-cols-1 lg:grid-cols-2
          gap-8 sm:gap-10 lg:gap-12
          items-start lg:items-center
        "
      >
        {/* Left: text teaser */}
        <div
          className="
          space-y-5 sm:space-y-6
          relative top-1 left-0
          lg:-top-80 lg:-left-10
        "
        >
          <h1 className="text-2xl sm:text-3xl lg:text-5xl text-gray-300 font-bold leading-tight">
            <a href="#about" className="cursor-pointer hover:opacity-80">
              Nikhil Reddy
            </a>
            <span className="block mt-2 text-gray-300 text-lg sm:text-xl lg:text-2xl font-medium">
              Software Developer • Java Full Stack Developer • Frontend Developer
            </span>
          </h1>

          <p className="text-gray-300 max-w-prose sm:max-w-xl text-sm sm:text-base">
            I’m a Software Developer with 5+ years of experience building
            full-stack and cloud-native applications using Java, Spring Boot,
            React/Next.js, and AWS. With proven experience in Data Structures and Algorithms,
            I specialize in designing scalable microservices and secure APIs that perform under
            high demand. I’m now seeking opportunities as a Software Developer,
            Java Full Stack Engineer, or React/Frontend Developer to continue creating impactful systems.
          </p>

          {/* Social */}
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:nikhilkothapally.reddy@gmail.com"
              className="rounded-md bg-white px-4 py-2 text-black hover:opacity-90 flex items-center justify-center"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* 🔻 Badge below teaser on mobile/small */}
          <div className="lg:hidden">
            <CircularBadge />
          </div>
        </div>

        {/* Right: visual box (responsive heights) */}
        <div
          className="
            h-56 sm:h-72 md:h-96 lg:h-[520px]
            rounded-2xl border border-white/10 bg-white/[0.02]
          "
        />
      </div>

      {/* 💻 Floating badge (desktop only) */}
      <div className="hidden lg:block">
        <CircularBadge />
      </div>

      {/* Projects & Contact */}
      <div id="projects" className="w-full mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-0">
        <Projects />
      </div>
      <div className="w-full mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-0">
        <Contact />
      </div>
    </section>
  );
}
