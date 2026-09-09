import { FoundationGate, PageHeading } from "@/components/layout/app-shell";
export const metadata = { title: "Restricted administration" };
export default function AdminPage() { return <><PageHeading eyebrow="RESTRICTED AREA" title="Administration" description="System operations require a verified administrator role." /><FoundationGate phase="ACCESS UNAVAILABLE" title="Administrator authentication required" description="No administrative data or actions are exposed. The admin API returns 401. Server-side role and ban enforcement must be implemented before this area can be enabled." /></>; }
