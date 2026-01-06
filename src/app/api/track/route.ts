// src/app/api/track/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // email SDKs usually need Node runtime

function getClientIp(req: NextRequest) {
  // Vercel / proxies usually set this
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  // NextRequest doesn't always expose `ip` in types/runtime.
  // Use a safe, typed access without @ts-ignore.
  const ip = (req as unknown as { ip?: string }).ip;

  return ip || "unknown";
}

// Optional: simple UA normalization (Chrome UA contains "Safari/...")
function getBrowserLabel(userAgent: string) {
  const ua = userAgent.toLowerCase();

  // order matters
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("chrome/")) return "Chrome";
  if (ua.includes("firefox/")) return "Firefox";
  if (ua.includes("safari/")) return "Safari";
  return "Unknown";
}

// Simple in-memory dedupe to avoid spam (resets on redeploy / cold start)
const seen = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json().catch(() => ({}));
    const path =
      typeof (body as { path?: unknown })?.path === "string"
        ? ((body as { path: string }).path as string)
        : "unknown";

    const ip = getClientIp(req);

    const userAgent = req.headers.get("user-agent") || "unknown";
    const browser = getBrowserLabel(userAgent);

    const referer = req.headers.get("referer") || "unknown";
    const nowIso = new Date().toISOString();

    // Vercel Geo (works on Vercel; will be null/empty on localhost)
    const country = req.headers.get("x-vercel-ip-country") || "";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";

    const locationLine =
      city || region || country
        ? `${city || "?"}, ${region || "?"}, ${country || "?"}`
        : "Unavailable (localhost or non-Vercel hosting)";

    // Dedupe: same IP + same path -> only once per 30 minutes
    const key = `${ip}:${path}`;
    const now = Date.now();
    const last = seen.get(key);
    if (last && now - last < 30 * 60 * 1000) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    seen.set(key, now);

    // Validate env
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ALERT_TO_EMAIL;
    const fromEmail =
      process.env.ALERT_FROM_EMAIL ||
      "Portfolio Alerts <onboarding@resend.dev>";

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY in .env / .env.local" },
        { status: 500 }
      );
    }
    if (!toEmail) {
      return NextResponse.json(
        { ok: false, error: "Missing ALERT_TO_EMAIL in .env / .env.local" },
        { status: 500 }
      );
    }

    // Send email via Resend
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "Someone viewed your portfolio",
      text:
        `New portfolio view\n\n` +
        `Time: ${nowIso}\n` +
        `Path: ${path}\n` +
        `IP: ${ip}\n` +
        `Approx Location: ${locationLine}\n` +
        `Browser: ${browser}\n` +
        `User-Agent: ${userAgent}\n` +
        `Referer: ${referer}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // no unused `err` variable -> ESLint passes
    return NextResponse.json(
      { ok: false, error: "Server error while tracking" },
      { status: 500 }
    );
  }
}
