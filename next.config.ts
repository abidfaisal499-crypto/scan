import type { NextConfig } from "next";

const production = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ["@prisma/client", "bullmq", "ioredis"],
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Content-Security-Policy", value: [
        "default-src 'self'", "base-uri 'self'", "object-src 'none'", "frame-ancestors 'none'",
        "form-action 'self'", "img-src 'self' data:", "font-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        `script-src 'self' 'unsafe-inline'${production ? "" : " 'unsafe-eval'"}`,
        `connect-src 'self'${production ? "" : " ws: wss:"}`,
      ].join("; ") },
      ...(production ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
    ] }];
  },
};
export default nextConfig;
