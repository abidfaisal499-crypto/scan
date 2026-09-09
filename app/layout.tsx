import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "SentinelScan — Look before you click", template: "%s | SentinelScan" },
  description: "Advanced URL and domain threat intelligence in one place. A privacy-first, multi-engine cybersecurity platform.",
  icons: { icon: "/icon.svg" }, robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#0c1014", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body><AppShell>{children}</AppShell></body></html>;
}
