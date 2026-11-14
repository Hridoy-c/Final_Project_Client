import Link from "next/link";
import {
  Calendar,
  Globe,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { getJobs } from "@/lib/api/job";
import type { TcreatejobForm } from "@/types/jobsTypes";
import UpdateJobPostForm from "@/components/dashboard/recruiter/UpdateJobPostForm";
import DeleteJobPostForm from "@/components/dashboard/recruiter/DeleteJobPostForm";
import JobMoreActions from "@/components/dashboard/recruiter/JobMoreActions";

const frequencyShort: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per week": "week",
  "per month": "month",
  "per year": "yr",
};

function formatCompensation(job: TcreatejobForm) {
  const { minSalary, maxSalary, frequency } = job;
  if (!minSalary && !maxSalary) return "Not specified";

  const range =
    minSalary && maxSalary
      ? `€${minSalary} – €${maxSalary}`
      : `€${minSalary || maxSalary}`;

  const unit = frequencyShort[frequency];
  return unit ? `${range} / ${unit}` : range;
}

function formatDate(date: string) {
  if (!date) return "No deadline";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

function isExpired(date: string) {
  if (!date) return false;
  const d = new Date(date);
  return !Number.isNaN(d.getTime()) && d.getTime() < Date.now();
}

function CategoryBadge({ category }: { category: string }) {
  const letter = (category || "J").trim().charAt(0).toUpperCase();
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1d1b2e] text-sm font-semibold text-[#8a7dff]"
    >
      {letter}
    </span>
  );
}

function StatusBadge({ expired }: { expired: boolean }) {
  return expired ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-[#8e8e96]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#6b6b73]" />
      Expired
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      Active
    </span>
  );
}

function TypePill({ type }: { type: string }) {
  return (
    <span className="inline-block whitespace-nowrap rounded-full bg-[#1a1a1d] px-3 py-1 text-[11px] font-medium text-[#d6d6dc]">
      {type}
    </span>
  );
}

function Location({ job }: { job: TcreatejobForm }) {
  const Icon = job.isRemote ? Globe : MapPin;
  const text = job.isRemote
    ? job.location
      ? `Remote (${job.location})`
      : "Remote"
    : job.location || "—";

  return (
    <p className="flex items-center gap-1.5 text-xs text-[#8e8e96]">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{text}</span>
    </p>
  );
}

function Actions({ job }: { job: TcreatejobForm }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <UpdateJobPostForm job={job} />
      <DeleteJobPostForm job={job}   />
      <JobMoreActions job={job} />
    </div>
  );
}

export default async function ManageJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="w-full text-white">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] text-[#8e8e96]">
            Manage Jobs <span className="mx-0.5">&gt;</span>{" "}
            <span className="text-[#8a7dff]">Job Listings &amp; Postings</span>
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-1 max-w-md text-xs text-[#8e8e96]">
            Review live listings and update job details across your
            organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/add-job"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#5b4dff] px-5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(91,77,255,0.8)] transition-colors hover:bg-[#4a3de0]"
        >
          <Plus className="h-4 w-4" />
          New Job Post
        </Link>
      </header>

      {jobs.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-[#111114] px-6 py-16 text-center">
          <p className="text-sm font-medium">No job posts yet</p>
          <p className="mt-1 text-xs text-[#8e8e96]">
            Create your first listing to start receiving applicants.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden overflow-x-auto rounded-xl border border-white/[0.07] bg-[#111114] lg:block">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-[#8e8e96]">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    Job title &amp; dept
                  </th>
                  <th className="px-4 py-3 font-medium">
                    Company &amp; location
                  </th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Compensation</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Deadline</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {jobs.map((job) => {
                  const expired = isExpired(job.deadline);
                  return (
                    <tr
                      key={job._id}
                      className="transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex max-w-[220px] items-center gap-3">
                          <CategoryBadge category={job.category} />
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {job.title || "Untitled"}
                            </p>
                            <p className="truncate text-xs text-[#8a7dff]">
                              {job.category || "Uncategorized"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-[200px]">
                          <p className="truncate text-sm">{job.company}</p>
                          <Location job={job} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <TypePill type={job.type} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-[#d6d6dc]">
                        {formatCompensation(job)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge expired={expired} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <p className="text-sm">{formatDate(job.deadline)}</p>
                        <p className="text-[11px] text-[#6b6b73]">
                          {expired ? "Closed" : "Open"}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Actions job={job} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet cards */}
          <ul className="mt-6 space-y-3 lg:hidden">
            {jobs.map((job) => {
              const expired = isExpired(job.deadline);
              return (
                <li
                  key={job._id}
                  className="rounded-xl border border-white/[0.07] bg-[#111114] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <CategoryBadge category={job.category} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {job.title || "Untitled"}
                        </p>
                        <p className="truncate text-xs text-[#8a7dff]">
                          {job.category || "Uncategorized"}
                        </p>
                      </div>
                    </div>
                    <StatusBadge expired={expired} />
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <p className="text-sm">{job.company}</p>
                    <Location job={job} />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <TypePill type={job.type} />
                    <span className="text-xs text-[#d6d6dc]">
                      {formatCompensation(job)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
                    <span className="flex items-center gap-1.5 text-xs text-[#8e8e96]">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(job.deadline)}
                    </span>
                    <Actions job={job} />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
