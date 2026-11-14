import React from "react";
import {
  Bookmark,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Layers,
  Search,
  Star,
  Wallet,
  Zap,
  History,
  Check,
} from "lucide-react";

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

const jobTypes = [
  { label: "Full-time", count: "1.2k", checked: true },
  { label: "Contract", count: "432", checked: false },
  { label: "Freelance", count: "156", checked: false },
];

const sortOptions = ["Most Recent", "Highest Salary", "Most Relevant"];

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

const BrowsePage = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0c] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Search bar */}
        <form
          role="search"
          className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#111114] p-3 sm:flex-row sm:items-center sm:p-4"
        >
          <div className="flex h-12 flex-1 items-center gap-3 rounded-xl bg-[#18181b] px-4">
            <Search className="h-4 w-4 shrink-0 text-[#8e8e96]" />
            <input
              type="search"
              placeholder="Search by job title, keywords..."
              aria-label="Search by job title or keywords"
              className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-[#6b6b73] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-xl bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-gray-200 sm:w-auto"
          >
            Search Jobs
          </button>
        </form>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-2xl border border-white/[0.07] bg-[#111114] p-5">
            <h2 className="text-base font-semibold">Filters</h2>

            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-[#e4e4ea]">
                Job Type
              </legend>

              <ul className="mt-4 space-y-3">
                {jobTypes.map((type) => (
                  <li key={type.label}>
                    <label className="flex cursor-pointer items-center gap-3 text-xs text-[#9a9aa3]">
                      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          defaultChecked={type.checked}
                          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[4px] border border-white/20 bg-[#18181b] checked:border-white checked:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff]"
                        />
                        <Check
                          strokeWidth={3}
                          className="pointer-events-none relative h-3 w-3 text-black opacity-0 peer-checked:opacity-100"
                        />
                      </span>
                      <span className="flex-1">{type.label}</span>
                      <span className="text-[11px] text-[#6b6b73]">
                        {type.count}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </aside>

          {/* Results */}
          <section className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-lg font-semibold sm:text-xl">
                Found 1,248 Professional Jobs
              </h1>

              <div className="flex items-center gap-2 text-xs text-[#8e8e96]">
                <label htmlFor="sort">Sort by:</label>
                <div className="relative">
                  <select
                    id="sort"
                    defaultValue="Most Recent"
                    className="h-9 appearance-none rounded-lg border border-white/[0.07] bg-[#18181b] py-0 pl-3 pr-8 text-xs text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5b4dff]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8e8e96]" />
                </div>
              </div>
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

                    <button
                      type="button"
                      aria-label="Save job"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#8e8e96] transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <nav
              aria-label="Pagination"
              className="mt-8 flex items-center justify-center gap-1.5"
            >
              <button
                type="button"
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18181b] text-white transition-colors hover:bg-[#232327]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-current="page"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-xs font-semibold text-black"
              >
                1
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18181b] text-xs text-[#c4c4cc] transition-colors hover:bg-[#232327]"
              >
                2
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18181b] text-xs text-[#c4c4cc] transition-colors hover:bg-[#232327]"
              >
                3
              </button>
              <span className="px-1 text-xs text-[#6b6b73]">...</span>
              <button
                type="button"
                className="flex h-8 min-w-8 items-center justify-center rounded-md bg-[#18181b] px-2 text-xs text-[#c4c4cc] transition-colors hover:bg-[#232327]"
              >
                42
              </button>

              <button
                type="button"
                aria-label="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18181b] text-white transition-colors hover:bg-[#232327]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </section>
        </div>
      </div>
    </main>
  );
};

export default BrowsePage;