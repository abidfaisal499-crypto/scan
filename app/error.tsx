"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="foundation-gate"><h2>Something interrupted the connection</h2><p>Please try again. No internal error details are exposed.</p><Button onClick={reset}>Try again</Button></div>; }
