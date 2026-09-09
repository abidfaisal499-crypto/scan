import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function NotFound() { return <div className="foundation-gate"><SearchX size={40} /><span className="small-badge">404 · NOT FOUND</span><h1>No trail found here</h1><p>This page or scan does not exist. No reports are generated during the Phase 1 foundation.</p><Button asChild variant="outline"><Link href="/"><ArrowLeft size={15} /> Back to workspace</Link></Button></div>; }
