import { Mail, Phone, Linkedin, Github, Download } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <div id="contact" className="w-full text-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center space-y-12">
      
        {/* Closing Line */}
        <h2 className="text-3xl lg:text-4xl font-bold">
          Let’s build something impactful together 🚀
        </h2>
        <p className="text-lg text-gray-300">
          I’m always open to opportunities where I can contribute to scalable,
          innovative and user-focused solutions.
        </p>

        {/* Links Row */}
        <div className="flex flex-wrap justify-center gap-8 text-base font-medium">
          <a
            href="mailto:nikhilkothapally.reddy@gmail.com"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <Mail size={18} /> Email
          </a>
          <a
            href="tel:+17373966514"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <Phone size={18} /> Mobile
          </a>
          <a
            href="https://www.linkedin.com/in/sj60383721a/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://github.com/nikhilreddy1102"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <Github size={18} /> GitHub
          </a>
          <a
  href="/knikhil_reddy.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:opacity-80"
>
  <Download size={18} /> Resume
</a>


          {/* Location (not clickable) */}
          <span className="flex items-center gap-2 cursor-default">
            📍 Austin, TX
          </span>
        </div>
      </div>
    </div>
  );
}
