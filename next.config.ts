// next.config.ts
import type { NextConfig } from 'next';

const repo = 'Portfolio' as const; // must match your GitHub repo name exactly (case-sensitive)

const nextConfig: NextConfig = {
  output: 'export',              // build static files for GitHub Pages
  images: { unoptimized: true }, // Pages is static; disable Next/Image optimizer
  basePath: process.env.NODE_ENV === 'production' ? `/${repo}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repo}/` : '',
  trailingSlash: true,           // ensures /about -> /about/index.html
};

export default nextConfig;
