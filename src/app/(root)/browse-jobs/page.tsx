import React from "react";
import { Clock, Flame, Layers, Star, Wallet, Zap, History } from "lucide-react";

import BrowseFilters from "@/components/browse-jobs/BrowseFilters";
import {
  JobSearchBar,
  JobsPagination,
  SaveJobButton,
  SortSelect,
} from "@/components/browse-jobs/BrowseControls";

/* -------------------------------------------------------------------------- */
/*                                 Dummy data                                 */
/* -------------------------------------------------------------------------- */

type TagIcon = "clock" | "layers" | "history" | "star";
type Badge = "easy-apply" | "hot-job";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  tag: { label: string; icon: TagIcon };
  badge?: Badge;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "TechFlow Systems",
    location: "San Francisco, CA (Remote)",
    salary: "$140k - $180k",
    tag: { label: "Full-time", icon: "clock" },
    badge: "easy-apply",
  },
  {
    id: 2,
    title: "Lead Frontend Engineer",
    company: "FinGrid Solutions",
    location: "New York, NY",
    salary: "$165k - $210k",
    tag: { label: "Hybrid", icon: "layers" },
  },
  {
    id: 3,
    title: "UX Researcher",
    company: "CreativeStudio",
    location: "Austin, TX",
    salary: "$110k - $145k",
    tag: { label: "Contract", icon: "history" },
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    company: "HealthAI Corp",
    location: "Boston, MA (Remote)",
    salary: "$180k - $250k",
    tag: { label: "Senior", icon: "star" },
    badge: "hot-job",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Small parts                                */
/* -------------------------------------------------------------------------- */

function TagIconView({ name }: { name: TagIcon }) {
  const cls = "h-3.5 w-3.5";
  switch (name) {
    case "clock":
      return <Clock className={cls} />;
    case "layers":
      return <Layers className={cls} />;
    case "history":
      return <History className={cls} />;
    case "star":
      return <Star className={cls} />;
  }
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-[#1a1a1d] px-2.5 py-1 text-[11px] font-medium text-[#d6d6dc]">
      {children}
    </span>
  );
}

function BadgeView({ type }: { type: Badge }) {
  if (type === "easy-apply") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
        <Zap className="h-3.5 w-3.5" />
        Easy Apply
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[11px] font-medium text-orange-400">
      <Flame className="h-3.5 w-3.5" />
      Hot Job
    </span>
  );
}

function CompanyLogo({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#161619] text-base font-semibold text-[#8a7dff] sm:h-14 sm:w-14"
    >
      {name.charAt(0)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

const BrowsePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();

  // TODO: const jobs = await getJobs(query);

  return (
    <main className="min-h-screen bg-[#0a0a0c] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Search bar */}
        <JobSearchBar />

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <BrowseFilters />

          {/* Results */}
          <section className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-lg font-semibold sm:text-xl">
                Found 1,248 Professional Jobs
              </h1>
              <SortSelect />
            </div>

            {/* Job cards */}
            <ul className="mt-5 space-y-4">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="rounded-2xl border border-white/[0.07] bg-[#111114] p-4 transition-colors hover:border-white/15 sm:p-5"
                >
                  <div className="flex items-start gap-4">
                    <CompanyLogo name={job.company} />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold sm:text-lg">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-[#6b6b73] sm:text-sm">
                        {job.company} • {job.location}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Chip>
                          <Wallet className="h-3.5 w-3.5" />
                          {job.salary}
                        </Chip>
                        <Chip>
                          <TagIconView name={job.tag.icon} />
                          {job.tag.label}
                        </Chip>
                        {job.badge && <BadgeView type={job.badge} />}
                      </div>
                    </div>

                    <SaveJobButton jobId={job.id} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <JobsPagination currentPage={1} totalPages={42} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default BrowsePage;