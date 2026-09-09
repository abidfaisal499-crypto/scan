"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, File, Globe2, Info, Link2, LoaderCircle, LockKeyhole, Search, Server, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApiErrorBody } from "@/api/contracts";
const tabs = [{ id: "url", label: "URL", icon: Link2 }, { id: "domain", label: "Domain", icon: Globe2 }, { id: "ip", label: "IP address", icon: Server }, { id: "file", label: "File", icon: File }];
export function Scanner() {
  const [activeTab, setActiveTab] = useState("url");
  const [url, setUrl] = useState("");
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ title: string; message: string; kind: "error" | "info" } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim()) { setFeedback({ title: "A link is all you need", message: "Enter a complete URL starting with https:// or http://.", kind: "error" }); return; }
    setPending(true); setFeedback(null);
    try {
      const response = await fetch("/api/v1/scan/url", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url.trim() }), signal: AbortSignal.timeout(12000) });
      const body = await response.json() as ApiErrorBody;
      if (body.error?.code === "FEATURE_NOT_AVAILABLE") setFeedback({ title: "URL validated. Scanning is not enabled yet.", message: "This is the Phase 1 foundation. No request was sent to this URL and no scan was saved. The secure scanning engine is planned for Phases 3–7.", kind: "info" });
      else setFeedback({ title: "We couldn’t accept this URL", message: body.error?.message ?? "An unexpected response was received. Please try again.", kind: "error" });
    } catch { setFeedback({ title: "Connection interrupted", message: "The service could not be reached. Check your connection and try again.", kind: "error" }); }
    finally { setPending(false); }
  }
  function changeTab(id: string) { setActiveTab(id); setFeedback(null); }
  return <section className="scanner-card" id="scanner" aria-label="Threat scanner">
    <div className="scanner-top"><div className="scanner-tabs" role="tablist" aria-label="Scan type">{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" id={`tab-${id}`} role="tab" aria-selected={activeTab === id} aria-controls="scanner-panel" tabIndex={activeTab === id ? 0 : -1} onKeyDown={(event) => { const index = tabs.findIndex((t) => t.id === id); const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1; if (next !== -1) { event.preventDefault(); changeTab(tabs[next].id); document.getElementById(`tab-${tabs[next].id}`)?.focus(); } }} className={cn("scanner-tab", activeTab === id && "selected")} onClick={() => changeTab(id)}><Icon size={16} /><span>{label}</span>{id === "file" && <small>SOON</small>}</button>)}</div><span className="scanner-private"><LockKeyhole size={12} /> Private by design</span></div>
    <div id="scanner-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
    {activeTab === "url" ? <div className="scanner-body"><form onSubmit={submit} noValidate><label htmlFor="url-input" className="sr-only">URL to analyze</label><div className={cn("url-input-wrap", feedback?.kind === "error" && "input-error")}><Link2 size={20} className="url-input-icon" /><input id="url-input" type="url" placeholder="Enter a URL to uncover potential threats..." value={url} onChange={(event) => { setUrl(event.target.value); if (feedback) setFeedback(null); }} autoComplete="off" spellCheck={false} maxLength={4096} aria-describedby="scanner-notice" aria-invalid={feedback?.kind === "error"} /><Button disabled={pending} type="submit">{pending ? <LoaderCircle className="spin" size={17} /> : <Search size={16} />}<span>{pending ? "Validating..." : "Scan URL"}</span>{!pending && <ArrowRight size={16} />}</Button></div></form><div className="scanner-helper"><p><ShieldCheck size={13} /> Look before you click. Only HTTP and HTTPS links are accepted.</p><button type="button" onClick={() => { setUrl("https://example.com"); setFeedback(null); document.getElementById("url-input")?.focus(); }}>Try an example <ArrowUpRightIcon /></button></div></div> : <div className="scanner-coming"><span className="coming-icon">{activeTab === "domain" ? <Globe2 size={24} /> : activeTab === "ip" ? <Server size={24} /> : <File size={24} />}</span><div><h3>{tabs.find((t) => t.id === activeTab)?.label} analysis is on the roadmap</h3><p>{activeTab === "domain" ? "Domain intelligence will be part of the secure analysis engine." : "This capability will be added after the URL scanning engine."} No input is collected.</p></div><Link href="/docs#roadmap">View roadmap <ArrowRight size={15} /></Link></div>}
    </div>
    {feedback && <div className={cn("scanner-feedback", feedback.kind)} role={feedback.kind === "error" ? "alert" : "status"}>{feedback.kind === "error" ? <Info size={18} /> : <Check size={18} />}<div><strong>{feedback.title}</strong><p>{feedback.message}</p></div><button aria-label="Dismiss message" onClick={() => setFeedback(null)}><X size={16} /></button></div>}
    <div className="scanner-notice" id="scanner-notice"><Info size={12} /><span>Phase 1 foundation <span className="notice-divider">·</span> URL validation is available. Live threat analysis is not enabled.</span><Link href="/docs#roadmap">Learn more <ArrowRight size={12} /></Link></div>
  </section>;
}
function ArrowUpRightIcon() { return <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.3" /></svg>; }
