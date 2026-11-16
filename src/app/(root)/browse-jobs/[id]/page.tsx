import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe,
  Layers,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { getJobsById } from "@/lib/api/job";
import { getApplications } from "@/lib/api/applications";
import { SaveJobButton } from "@/components/browse-jobs/BrowseControls";
import ApplyJobModal from "@/components/browse-jobs/ApplyJobModal";
import type { TApplication } from "@/types/applicationTypes";

const frequencyShort: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per week": "week",
  "per month": "month",
  "per year": "yr",
};

const toLines = (text?: string) =>
  (text ?? "")
    .split(/\r?\n|•/)
    .map((l) => l.trim())
    .filter(Boolean);

const formatDate = (value?: string) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// কম্পোনেন্টের বাইরে রাখা হয়েছে, তাই impure error আসবে না
function isExpired(deadline?: string) {
  if (!deadline) return false;
  const time = new Date(deadline).getTime();
  if (isNaN(time)) return false;
  return time < Date.now();
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111114] p-4">
      <div className="text-[#8e8e96]">{icon}</div>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-[#6b6b73]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/[0.07] py-6 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-[#8e8e96]">Not provided.</p>;
  }
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-sm leading-relaxed text-[#b4b4bc]"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a7dff]" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-white/[0.06] py-3 last:border-b-0">
      <span className="mt-0.5 text-[#8e8e96]">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-[#6b6b73]">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

const JobsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const job = await getJobsById(id);

  if (!job) notFound();

  // ইউজার আগে apply করেছে কি না, সার্ভারে চেক
  const session = await auth.api.getSession({ headers: await headers() });

  let alreadyApplied = false;
  if (session) {
    const applications = (await getApplications()) as TApplication[];
    alreadyApplied = applications.some(
      (a) => a.jobId === id && a.seekerId === session.user.id,
    );
  }

  const unit = frequencyShort[job.frequency];
  const salary =
    job.minSalary || job.maxSalary
      ? `$${job.minSalary || job.maxSalary}${
          job.minSalary && job.maxSalary ? ` – $${job.maxSalary}` : ""
        }${unit ? ` / ${unit}` : ""}`
      : "Not specified";

  const location = job.isRemote
    ? job.location
      ? `Remote (${job.location})`
      : "Remote"
    : job.location || "—";

  const expired = isExpired(job.deadline);

  const responsibilities = toLines(job.responsibilities);
  const requirements = toLines(job.requirements);

  return (
    <main className="min-h-screen bg-[#0a0a0c] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-xs text-[#8e8e96] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-[#111114] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <span
              aria-hidden
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#161619] text-xl font-semibold text-[#8a7dff] sm:h-16 sm:w-16"
            >
              {(job.company || "?").trim().charAt(0).toUpperCase()}
            </span>

            <div className="min-w-0">
              <h1 className="break-words text-xl font-semibold sm:text-2xl">
                {job.title}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-medium text-[#8e8e96]">
                  {job.company}
                </span>
                {job.recruiterId && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified Employer
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SaveJobButton jobId={job._id ?? ""} />
            {expired ? (
              <span className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400">
                Applications closed
              </span>
            ) : (
              <ApplyJobModal
                jobId={job._id ?? ""}
                jobTitle={job.title}
                company={job.company}
                alreadyApplied={alreadyApplied}
              />
            )}
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Banknote className="h-4 w-4" />}
            label="Salary range"
            value={salary}
          />
          <StatCard
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={location}
          />
          <StatCard
            icon={<Clock className="h-4 w-4" />}
            label="Job type"
            value={job.type || "—"}
          />
          <StatCard
            icon={<Layers className="h-4 w-4" />}
            label="Category"
            value={job.category || "—"}
          />
        </div>

        {/* Body */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111114] p-5 sm:p-6">
            <Section title="Responsibilities">
              <BulletList items={responsibilities} />
            </Section>

            <Section title="Requirements">
              <BulletList items={requirements} />
            </Section>
          </article>

          <aside className="h-fit space-y-6">
            <div className="rounded-2xl border border-white/[0.07] bg-[#111114] p-5">
              <h2 className="text-base font-semibold">Job Overview</h2>
              <div className="mt-3">
                <InfoRow
                  icon={<Briefcase className="h-4 w-4" />}
                  label="Company"
                  value={job.company || "—"}
                />
                <InfoRow
                  icon={<Globe className="h-4 w-4" />}
                  label="Work mode"
                  value={job.isRemote ? "Remote" : "On-site"}
                />
                <InfoRow
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Posted"
                  value={formatDate(job.jobPostDate)}
                />
                <InfoRow
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Deadline"
                  value={
                    expired
                      ? `${formatDate(job.deadline)} (closed)`
                      : formatDate(job.deadline)
                  }
                />
              </div>
            </div>

            {(job.recruiterName || job.recruiterEmail) && (
              <div className="rounded-2xl border border-white/[0.07] bg-[#111114] p-5">
                <h2 className="text-base font-semibold">Recruiter</h2>
                <div className="mt-3">
                  {job.recruiterName && (
                    <InfoRow
                      icon={<User className="h-4 w-4" />}
                      label="Name"
                      value={job.recruiterName}
                    />
                  )}
                  {job.recruiterEmail && (
                    <InfoRow
                      icon={<Mail className="h-4 w-4" />}
                      label="Email"
                      value={job.recruiterEmail}
                    />
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default JobsDetailsPage;