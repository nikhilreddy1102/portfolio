"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((s) => !s);
  const close = () => setOpen(false);

  // refs to detect outside click
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close on outside click (mobile only)
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!open) return;
      if (typeof window !== "undefined" && window.innerWidth >= 1024) return; // only mobile/tablet
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;   // click inside menu → ignore
      if (buttonRef.current?.contains(t)) return; // click on burger/X → ignore
      setOpen(false);                              // click anywhere else → close
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/#home"
          className="font-semibold tracking-wide text-gray-300 hover:opacity-80"
        >
          PORTFOLIO
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:opacity-80 text-gray-300">About</Link>
          <Link href="/experience" className="hover:opacity-80 text-gray-300">Experience</Link>
          <Link href="/#projects" className="hover:opacity-80 text-gray-300">Projects</Link>
          <Link href="/#contact" className="hover:opacity-80 text-gray-300">Contact</Link>
          <Link
            href="/NikhilReddy_Resume.pdf"
            prefetch={false}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-md bg-white/10 text-gray-300 px-3 py-1.5 hover:bg-white/20"
          >
            <Download size={16} /> Resume
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          onClick={toggle}
          aria-expanded={open}
          aria-label="Open menu"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/10"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        ref={menuRef}
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 pb-3 pt-1">
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/about" onClick={close} className="block rounded-md px-3 py-2 text-gray-200 hover:bg-white/10">About</Link>
            <Link href="/experience" onClick={close} className="block rounded-md px-3 py-2 text-gray-200 hover:bg-white/10">Experience</Link>
            <Link href="/#projects" onClick={close} className="block rounded-md px-3 py-2 text-gray-200 hover:bg-white/10">Projects</Link>
            <Link href="/#contact" onClick={close} className="block rounded-md px-3 py-2 text-gray-200 hover:bg-white/10">Contact</Link>
            <Link
              href="/NikhilReddy_Resume.pdf"
              prefetch={false}
              target="_blank"
              rel="noopener"
              onClick={close}
              className="mt-1 flex items-center gap-2 rounded-md bg-white/10 text-gray-200 px-3 py-2 hover:bg-white/20"
            >
              <Download size={18} /> Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
