"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Activity, ArrowUpRight, BookOpen, ChevronRight, CircleHelp, Code2, Globe2, History, LayoutDashboard, Link2, Menu, Search, Settings2, ShieldCheck, Terminal, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const navigation = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "URL scanner", href: "/#scanner", icon: Link2 },
  { label: "Scan history", href: "/dashboard/scans", icon: History },
  { label: "Threat intelligence", href: "/#intelligence", icon: Globe2 },
];
const resources = [
  { label: "API documentation", href: "/docs", icon: Code2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings2 },
];
export function Brand({ compact = false }: { compact?: boolean }) { return <Link href="/" className="brand" aria-label="SentinelScan home"><span className="brand-mark"><ShieldCheck size={25} strokeWidth={1.8} /></span>{!compact && <span>Sentinel<span className="brand-light">Scan</span><span className="brand-period">.</span></span>}</Link>; }
export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") { event.preventDefault(); setSearchOpen((v) => !v); }
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  const title = path === "/" ? "Overview" : path === "/docs" ? "Documentation" : path.includes("settings") ? "Settings" : path.includes("scans") ? "Scan history" : path === "/admin" ? "Administration" : path === "/privacy" ? "Privacy policy" : path === "/terms" ? "Terms of service" : "Workspace";
  return <div className="app-shell">
    <a href="#main-content" className="skip-link">Skip to content</a>
    {mobileOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className={cn("sidebar", mobileOpen && "sidebar-open")}>
      <div className="sidebar-brand"><Brand /><button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button></div>
      <div className="workspace-switch"><span className="workspace-icon">S</span><div><strong>Personal workspace</strong><small>Community edition</small></div><span className="workspace-version">v0.1</span></div>
      <div className="nav-label">WORKSPACE</div>
      <nav aria-label="Workspace navigation">{navigation.map(({ label, href, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={cn("nav-item", path === href && "nav-active")} aria-current={path === href ? "page" : undefined}><Icon size={18} strokeWidth={1.6} /><span>{label}</span>{path === href && <span className="nav-active-dot" />}{label === "URL scanner" && <span className="nav-tag">NEW</span>}</Link>)}</nav>
      <div className="nav-label resources-label">DEVELOPER</div>
      <nav aria-label="Developer resources">{resources.map(({ label, href, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={cn("nav-item", path === href && "nav-active")} aria-current={path === href ? "page" : undefined}><Icon size={18} strokeWidth={1.6} /><span>{label}</span>{label === "API documentation" && <ArrowUpRight size={14} className="nav-end" />}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="developer-card"><span className="developer-icon"><Terminal size={19} /></span><h3>Intelligence. Integrated.</h3><p>Built for your workflow.<br />Designed for your next idea.</p><Link href="/docs">Explore the API <ArrowUpRight size={14} /></Link></div>
      <Link href="/docs#roadmap" className="system-status"><span className="status-dot amber" /><span>Foundation environment</span><CircleHelp size={13} /></Link>
      <Link href="/dashboard/settings" className="sidebar-profile"><span className="profile-avatar">S</span><span><strong>Guest workspace</strong><small>Authentication coming in Phase 2</small></span><ChevronRight size={15} /></Link></div>
    </aside>
    <div className="main-column"><header className="topbar"><div className="breadcrumb"><button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><span className="breadcrumb-root">Workspace</span><ChevronRight size={13} /><strong>{title}</strong></div><div className="topbar-actions"><button className="search-trigger" onClick={() => setSearchOpen(true)} aria-label="Search pages"><Search size={16} /><span>Search anything...</span><kbd>⌘ K</kbd></button><span className="topbar-divider" /><Link className="help-link" href="/docs" aria-label="Help and documentation"><CircleHelp size={18} /></Link><Link href="/dashboard/settings" className="topbar-avatar" aria-label="Account settings">S</Link></div></header>
      <main id="main-content" className="main-content">{children}</main>
      <footer className="footer"><div><ShieldCheck size={15} /><span>© {new Date().getFullYear()} SentinelScan</span><span className="footer-separator">·</span><span className="footer-tagline">A safer internet starts with a scan.</span></div><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/docs">Documentation <ArrowUpRight size={11} /></Link></div></footer>
    </div>
    <Dialog open={searchOpen} onOpenChange={setSearchOpen} title="Find your way" description="Search pages and resources in your workspace."><div className="dialog-search"><Search size={18} /><input autoFocus placeholder="Search SentinelScan..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search pages" /></div><div className="search-results">{[...navigation, ...resources].filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).map(({ label, href, icon: Icon }) => <Link href={href} key={href} onClick={() => setSearchOpen(false)}><Icon size={18} />{label}<ChevronRight size={14} /></Link>)}{![...navigation, ...resources].some((item) => item.label.toLowerCase().includes(query.toLowerCase())) && <p>No pages found. Try “scanner” or “API”.</p>}</div></Dialog>
  </div>;
}
export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="page-heading"><div className="eyebrow"><Activity size={13} />{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>; }
export function FoundationGate({ title, description, phase }: { title: string; description: string; phase: string }) { return <div className="foundation-gate"><span className="gate-icon"><ShieldCheck size={35} strokeWidth={1.4} /></span><span className="small-badge">{phase}</span><h2>{title}</h2><p>{description}</p><Button asChild variant="outline"><Link href="/docs#roadmap"><BookOpen size={15} /> View implementation roadmap <ArrowUpRight size={14} /></Link></Button></div>; }
