import React from "react";
import { Briefcase, Globe, MapPin, Wallet } from "lucide-react";

import BrowseFilters from "@/components/browse-jobs/BrowseFilters";
import {
  JobSearchBar,
  JobsPagination,
  SaveJobButton,
  SortSelect,
} from "@/components/browse-jobs/BrowseControls";
import { getJobsPage } from "@/lib/api/job";
import type { TcreatejobForm } from "@/types/jobsTypes";

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
      ? `$${minSalary} – $${maxSalary}`
      : `$${minSalary || maxSalary}`;

  const unit = frequencyShort[frequency];
  return unit ? `${range} / ${unit}` : range;
}

function formatLocation(job: TcreatejobForm) {
  if (job.isRemote) return job.location ? `Remote (${job.location})` : "Remote";
  return job.location || "—";
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-[#1a1a1d] px-2.5 py-1 text-[11px] font-medium text-[#d6d6dc]">
      {children}
    </span>
  );
}

function CompanyLogo({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#161619] text-base font-semibold text-[#8a7dff] sm:h-14 sm:w-14"
    >
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

const BrowsePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(
    Object.entries(search).flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map((v) => [key, v])
        : value === undefined
          ? []
          : [[key, value]],
    ),
  );
  const query = urlSearch.toString();

  const { jobs, total, page, totalPages } = await getJobsPage(query);

  return (
    <main className="min-h-screen bg-[#0a0a0c] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <JobSearchBar />

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <BrowseFilters />

          <section className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-lg font-semibold sm:text-xl">
                {total > 0
                  ? `Found ${total} Job${total === 1 ? "" : "s"}`
                  : "No Jobs Found"}
              </h1>
              <SortSelect />
            </div>

            {jobs.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-[#111114] px-6 py-16 text-center">
                <p className="text-sm font-medium">No jobs found</p>
                <p className="mt-1 text-xs text-[#8e8e96]">
                  Check back soon or adjust your filters.
                </p>
              </div>
            ) : (
              <>
                <ul className="mt-5 space-y-4">
                  {jobs.map((job, index) => (
                    <li
                      key={job._id ?? `${job.title}-${index}`}
                      className="rounded-2xl border border-white/[0.07] bg-[#111114] p-4 transition-colors hover:border-white/15 sm:p-5"
                    >
                      <div className="flex items-start gap-4">
                        <CompanyLogo name={job.company} />

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-base font-semibold sm:text-lg">
                            {job.title || "Untitled"}
                          </h3>
                          <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#6b6b73] sm:text-sm">
                            <span>{job.company}</span>
                            <span aria-hidden>•</span>
                            <span className="inline-flex items-center gap-1">
                              {job.isRemote ? (
                                <Globe className="h-3.5 w-3.5" />
                              ) : (
                                <MapPin className="h-3.5 w-3.5" />
                              )}
                              {formatLocation(job)}
                            </span>
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <Chip>
                              <Wallet className="h-3.5 w-3.5" />
                              {formatCompensation(job)}
                            </Chip>
                            {job.type && (
                              <Chip>
                                <Briefcase className="h-3.5 w-3.5" />
                                {job.type}
                              </Chip>
                            )}
                            {job.isRemote && (
                              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                                <Globe className="h-3.5 w-3.5" />
                                Remote
                              </span>
                            )}
                          </div>
                        </div>

                        <SaveJobButton jobId={job._id ?? ""} />
                      </div>
                    </li>
                  ))}
                </ul>

                <JobsPagination currentPage={page} totalPages={totalPages} />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default BrowsePage;