"use client";

import React from "react";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*                                 Search bar                                 */
/* -------------------------------------------------------------------------- */

export function JobSearchBar() {
    const router = useRouter();
  const handleSearchChange = (value: string) => {
    // TODO: keep the keyword (title / company / keywords) in state
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const search = data.search as string;

    const params = new URLSearchParams()
    params.set("search", search)

    router.push(`/browse-jobs?${params.toString()}`)
  };

  return (
    <form
      role="search"
      onSubmit={handleSearchSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#111114] p-3 sm:flex-row sm:items-center sm:p-4"
    >
      <div className="flex h-12 flex-1 items-center gap-3 rounded-xl bg-[#18181b] px-4">
        <Search className="h-4 w-4 shrink-0 text-[#8e8e96]" />
        <input
          type="search"
          name="search"
          placeholder="Search by job title, company, keywords..."
          aria-label="Search by job title, company or keywords"
          onChange={(e) => handleSearchChange(e.target.value)}
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
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Sort select                               */
/* -------------------------------------------------------------------------- */

const sortOptions = [
  "Most Recent",
  "Highest Salary",
  "Lowest Salary",
  "Deadline Soon",
];

export function SortSelect() {
  const handleSortChange = (value: string) => {
    // TODO: push `?sort=...` to the URL
  };

  return (
    <div className="flex items-center gap-2 text-xs text-[#8e8e96]">
      <label htmlFor="sort">Sort by:</label>
      <div className="relative">
        <select
          id="sort"
          defaultValue="Most Recent"
          onChange={(e) => handleSortChange(e.target.value)}
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
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Save job                                  */
/* -------------------------------------------------------------------------- */

export function SaveJobButton({ jobId }: { jobId: string | number }) {
  const handleSave = () => {
    // TODO: save / unsave job (jobId)
  };

  return (
    <button
      type="button"
      aria-label="Save job"
      onClick={handleSave}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#8e8e96] transition-colors hover:bg-white/[0.06] hover:text-white"
    >
      <Bookmark className="h-4 w-4" />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Pagination                                 */
/* -------------------------------------------------------------------------- */

const pageBtn =
  "flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs transition-colors";

export function JobsPagination({
  currentPage = 1,
  totalPages = 42,
}: {
  currentPage?: number;
  totalPages?: number;
}) {
  const handlePrevious = () => {
    // TODO: go to currentPage - 1
  };

  const handleNext = () => {
    // TODO: go to currentPage + 1
  };

  const handlePageChange = (page: number) => {
    // TODO: go to `page`
  };

  // Simple window: 1 2 3 ... last
  const pages = [1, 2, 3].filter((p) => p < totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-1.5"
    >
      <button
        type="button"
        aria-label="Previous page"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={`${pageBtn} bg-[#18181b] text-white hover:bg-[#232327] disabled:opacity-40`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => handlePageChange(page)}
          className={`${pageBtn} ${
            page === currentPage
              ? "bg-white font-semibold text-black"
              : "bg-[#18181b] text-[#c4c4cc] hover:bg-[#232327]"
          }`}
        >
          {page}
        </button>
      ))}

      {totalPages > 4 && <span className="px-1 text-xs text-[#6b6b73]">...</span>}

      <button
        type="button"
        aria-current={totalPages === currentPage ? "page" : undefined}
        onClick={() => handlePageChange(totalPages)}
        className={`${pageBtn} ${
          totalPages === currentPage
            ? "bg-white font-semibold text-black"
            : "bg-[#18181b] text-[#c4c4cc] hover:bg-[#232327]"
        }`}
      >
        {totalPages}
      </button>

      <button
        type="button"
        aria-label="Next page"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`${pageBtn} bg-[#18181b] text-white hover:bg-[#232327] disabled:opacity-40`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
} 