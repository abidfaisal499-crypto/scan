"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronRight, Layers3, PlugZap } from "lucide-react";
import { providerCatalog } from "@/config/site";
export function ProviderList() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return <section className="panel providers-panel" id="intelligence"><div className="panel-header"><div><h2><Layers3 size={17} /> Security providers</h2><p>Independent signals. A more complete picture.</p></div><Link href="/docs#providers">View integrations <ArrowUpRight size={13} /></Link></div><div className="provider-table-header"><span>INTELLIGENCE SOURCE</span><span>INTEGRATION STATUS</span></div><div>{providerCatalog.map((provider) => <div key={provider.id}><button className="provider-row" aria-expanded={expanded === provider.id} onClick={() => setExpanded(expanded === provider.id ? null : provider.id)}><span className={`provider-logo ${provider.color}`}>{provider.initials}</span><span className="provider-details"><strong>{provider.name}</strong><span>{provider.description}</span></span><span className="provider-status"><span /> Planned</span>{expanded === provider.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</button>{expanded === provider.id && <div className="provider-expanded"><PlugZap size={16} /><p>This integration is scheduled for Phase {provider.phase}. It is currently disabled and returns no verdict. Credentials will be read on the server only.</p><Link href="/docs#providers">Integration details <ArrowUpRight size={13} /></Link></div>}</div>)}</div><div className="panel-footnote"><span className="status-dot neutral" /> 0 of 5 providers connected <span>No provider results are being simulated.</span></div></section>;
}
