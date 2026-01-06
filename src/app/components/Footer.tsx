export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs sm:text-sm text-gray-400 space-y-1 sm:space-y-0">
        <span className="block sm:inline">
          Built with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="font-semibold text-white hover:underline"
          >
            Next.js
          </a>
        </span>
        <span className="hidden sm:inline"> & </span>
        <span className="block sm:inline">
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            className="font-semibold text-white hover:underline"
          >
            Tailwind CSS
          </a>
        </span>

        {/* Subtle privacy notice */}
        <p className="mt-2 text-[10px] sm:text-xs text-gray-500">
          Privacy: This site logs basic anonymous visit metadata for security.
        </p>
      </div>
    </footer>
  );
}
