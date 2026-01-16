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
  I’m a Software Developer experienced in building scalable full-stack and cloud-native
  applications using Java, Spring Boot, React, Next.js, and AWS. I specialize in designing
  distributed microservices, secure APIs, and high-performance user interfaces backed by
  strong fundamentals in Data Structures and Algorithms. My recent work also includes
  developing LLM-powered AI agents, integrating Azure OpenAI and Anthropic models, and
  implementing RAG pipelines with embeddings and vector search to enable intelligent,
  context-aware interactions. I’m now seeking opportunities as a Software Developer, Java
  Full Stack Engineer, or React/Frontend Developer to continue creating impactful,
  engineering-driven systems.
</p>


          {/* Social */}
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:knikhilreddy2001@gmail.com"
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
    rounded-2xl border border-white/10 bg-white/[0.02]
    p-6 sm:p-8 flex flex-col gap-4
    w-full
  "
>
  <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mb-2 text-center">
    Tech Stack
  </h3>

  <div
    className="
      grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-300
      place-items-center
    "
  >
        {/* Backend */}
    <span className="px-3 py-1">Java</span>
    <span className="px-3 py-1">Spring Boot</span>
    <span className="px-3 py-1">Microservices</span>
    <span className="px-3 py-1">REST APIs</span>
    <span className="px-3 py-1">GraphQL</span>
    <span className="px-3 py-1">Node.js</span>
    <span className="px-3 py-1">Kafka</span>
    <span className="px-3 py-1">Redis</span>
    <span className="px-3 py-1">PostgreSQL</span>
    <span className="px-3 py-1">MongoDB</span>


    {/* Frontend */}
    <span className="px-3 py-1">React</span>
    <span className="px-3 py-1">Next.js</span>
    <span className="px-3 py-1">TypeScript</span>
    <span className="px-3 py-1">Tailwind CSS</span>

    {/* Cloud / DevOps */}
    <span className="px-3 py-1">AWS</span>
    <span className="px-3 py-1">Docker</span>
    <span className="px-3 py-1">Kubernetes</span>
    <span className="px-3 py-1">GitHub Actions</span>
    {/* Testing */}
<span className="px-3 py-1">Jest</span>
<span className="px-3 py-1">JUnit</span>
<span className="px-3 py-1">Mockito</span>


   {/* AI / LLM */}
<span className="px-3 py-1">Azure OpenAI</span>
<span className="px-3 py-1">Agentic AI</span>
<span className="px-3 py-1">RAG Pipeline</span>
<span className="px-3 py-1">Embeddings</span>
<span className="px-3 py-1">Vector DB</span>
<span className="px-3 py-1">Python</span>
<span className="px-3 py-1">FastAPI</span>
<span className="px-3 py-1">Prompt Eng.</span>
<span className="px-3 py-1">Serverless</span>


    {/* Tools */}
    <span className="px-3 py-1">Git</span>
    <span className="px-3 py-1">Nginx</span>
    <span className="px-3 py-1">Figma</span>
  </div>
</div>


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
