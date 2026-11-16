import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

import { auth } from "@/lib/auth";
import { getApplications } from "@/lib/api/applications";
import { ApplicationStatus, TApplication } from "@/types/applicationsType";
import ExportPdfButton from "@/components/dashboard/seeker/ExportPdfButton";


const PAGE_SIZE = 5;

const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "border-white/10 bg-white/[0.06] text-[#c4c4cc]",
  Review: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Shortlisted: "border-sky-500/40 bg-sky-500/10 text-sky-400",
  Interview: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
  Rejected: "border-red-500/40 bg-red-500/10 text-red-400",
  Offered: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
};

// কম্পোনেন্টের বাইরে রাখা, তাই Date.now() এর impure error আসবে না
function timeAgo(value: string) {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return "—";

  const seconds = Math.max(0, Math.floor((Date.now() - time) / 1000));
  const units: [number, string][] = [
    [60 * 60 * 24 * 7, "week"],
    [60 * 60 * 24, "day"],
    [60 * 60, "hour"],
    [60, "minute"],
  ];

  for (const [size, label] of units) {
    if (seconds >= size) {
      const n = Math.floor(seconds / size);
      return `${n} ${label}${n > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}

const getStatus = (app: TApplication): ApplicationStatus =>
  app.status ?? "Applied";

const isArchived = (app: TApplication) => getStatus(app) === "Rejected";

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function JobCell({ app }: { app: TApplication }) {
  const meta = [app.jobType, app.workMode].filter(Boolean).join(" • ");

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1d1b2e] text-[#8a7dff]"
      >
        <Briefcase className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {app.jobTitle || "Job application"}
        </p>
        {meta && <p className="truncate text-xs text-[#8e8e96]">{meta}</p>}
      </div>
    </div>
  );
}

function DetailsLink({ app }: { app: TApplication }) {
  if (!app.jobId) return <span className="text-sm text-[#6b6b73]">—</span>;
  return (
    <Link
      href={`/browse-jobs/${app.jobId}`}
      className="text-sm text-[#d6d6dc] transition-colors hover:text-white"
    >
      Details
    </Link>
  );
}

function StatCard({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111114] p-4 sm:p-5">
      <p className="text-xs text-[#9a9aa3] sm:text-sm">{label}</p>
      <p className={`mt-2 text-2xl font-semibold sm:text-3xl ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

const buildHref = (tab: string, page: number) =>
  `?tab=${tab}&page=${page}`;

const ApplicationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string }>;
}) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const { tab: tabParam, page: pageParam } = await searchParams;
  const tab = tabParam === "archived" ? "archived" : "active";

  const all = ((await getApplications()) as TApplication[])
    .filter((a) => a.seekerId === session.user.id)
    .sort(
      (a, b) =>
        new Date(b.applyDate).getTime() - new Date(a.applyDate).getTime(),
    );

  // Stats
  const total = all.length;
  const shortlisted = all.filter((a) => getStatus(a) === "Shortlisted").length;
  const interviews = all.filter((a) => getStatus(a) === "Interview").length;
  const offered = all.filter((a) => getStatus(a) === "Offered").length;
  const successRate = total ? Math.round((offered / total) * 100) : 0;

  // Tab + pagination
  const list = all.filter((a) => (tab === "archived" ? isArchived(a) : !isArchived(a)));
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(Math.max(Number(pageParam) || 1, 1), totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const rows = list.slice(start, start + PAGE_SIZE);

  return (
    <div className="w-full text-white">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            My Applications
          </h1>
          <p className="mt-1 text-sm text-[#8e8e96]">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-white/[0.07] bg-[#111114] p-1">
            {(["active", "archived"] as const).map((t) => (
              <Link
                key={t}
                href={buildHref(t, 1)}
                className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  tab === t
                    ? "bg-[#1f1f23] text-white"
                    : "text-[#8e8e96] hover:text-white"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
          <ExportPdfButton />
        </div>
      </header>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total Applied" value={total} />
        <StatCard label="Shortlisted" value={shortlisted} />
        <StatCard label="Interviews" value={interviews} valueClass="text-amber-500" />
        <StatCard label="Success Rate" value={`${successRate}%`} valueClass="text-emerald-500" />
      </section>

      {rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-[#111114] px-6 py-16 text-center">
          <p className="text-sm font-medium">
            {tab === "archived" ? "No archived applications" : "No applications yet"}
          </p>
          <p className="mt-1 text-xs text-[#8e8e96]">
            {tab === "archived"
              ? "Rejected applications will appear here."
              : "Jobs you apply to will show up here."}
          </p>
          {tab === "active" && (
            <Link
              href="/browse-jobs"
              className="mt-5 inline-flex h-10 items-center rounded-lg bg-[#5b4dff] px-5 text-sm font-medium text-white hover:bg-[#4a3de0]"
            >
              Browse jobs
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111114]">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs text-[#8e8e96]">
                <tr className="border-b border-white/[0.06]">
                  <th className="px-6 py-4 font-medium">Job Title</th>
                  <th className="px-4 py-4 font-medium">Company</th>
                  <th className="px-4 py-4 font-medium">Applied</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {rows.map((app, i) => (
                  <tr
                    key={app._id ?? `${app.jobId}-${i}`}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="max-w-[280px] px-6 py-4">
                      <JobCell app={app} />
                    </td>
                    <td className="px-4 py-4 text-[#c4c4cc]">
                      {app.company || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[#8e8e96]">
                      {timeAgo(app.applyDate)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={getStatus(app)} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DetailsLink app={app} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="divide-y divide-white/[0.06] md:hidden">
            {rows.map((app, i) => (
              <li key={app._id ?? `${app.jobId}-${i}`} className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <JobCell app={app} />
                  <StatusBadge status={getStatus(app)} />
                </div>
                <div className="flex items-center justify-between text-xs text-[#8e8e96]">
                  <span>{app.company || "—"}</span>
                  <span>{timeAgo(app.applyDate)}</span>
                </div>
                <DetailsLink app={app} />
              </li>
            ))}
          </ul>

          {/* Footer / pagination */}
          <div className="flex flex-col gap-3 border-t border-white/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 print:hidden">
            <p className="text-xs text-[#8e8e96] sm:text-sm">
              Showing {start + 1}-{start + rows.length} of {list.length}{" "}
              applications
            </p>

            <nav aria-label="Pagination" className="flex items-center gap-1.5">
              <Link
                href={buildHref(tab, page - 1)}
                aria-label="Previous page"
                aria-disabled={page === 1}
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.07] text-[#c4c4cc] ${
                  page === 1 ? "pointer-events-none opacity-40" : "hover:bg-white/[0.06]"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={buildHref(tab, n)}
                  aria-current={n === page ? "page" : undefined}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm ${
                    n === page
                      ? "border-white bg-white font-semibold text-black"
                      : "border-white/[0.07] text-[#c4c4cc] hover:bg-white/[0.06]"
                  }`}
                >
                  {n}
                </Link>
              ))}

              <Link
                href={buildHref(tab, page + 1)}
                aria-label="Next page"
                aria-disabled={page === totalPages}
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.07] text-[#c4c4cc] ${
                  page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-white/[0.06]"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;