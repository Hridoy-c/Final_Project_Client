"use client";

import React from "react";

/* -------------------------------------------------------------------------- */
/*                                 Dummy data                                 */
/* -------------------------------------------------------------------------- */

type StatIconName = "file" | "users" | "bolt" | "check";

type Stat = {
  id: string;
  label: string;
  value: string;
  icon: StatIconName;
};

type Status = "Interviewing" | "New" | "Reviewing" | "Rejected";

type Application = {
  id: number;
  name: string;
  role: string;
  date: string;
  experience: string;
  status: Status;
  color: string;
};

const recruiterName = "Alex Sterling";

const stats: Stat[] = [
  { id: "posts", label: "Total Job Posts", value: "48", icon: "file" },
  { id: "applicants", label: "Total Applicants", value: "1,284", icon: "users" },
  { id: "active", label: "Active Jobs", value: "18", icon: "bolt" },
  { id: "closed", label: "Jobs Closed", value: "32", icon: "check" },
];

const applications: Application[] = [
  {
    id: 1,
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
    color: "bg-teal-600",
  },
  {
    id: 2,
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
    color: "bg-sky-600",
  },
  {
    id: 3,
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
    color: "bg-amber-600",
  },
  {
    id: 4,
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
    color: "bg-rose-600",
  },
];

const statusStyles: Record<Status, string> = {
  Interviewing: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
  New: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  Reviewing: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  Rejected: "border-red-500/40 bg-red-500/10 text-red-400",
};

/* -------------------------------------------------------------------------- */
/*                                 Small parts                                */
/* -------------------------------------------------------------------------- */

function StatIcon({ name }: { name: StatIconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
    "aria-hidden": true,
  };

  switch (name) {
    case "file":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8M21 20c0-2.5-1.4-4.6-3.5-5.6" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" />
        </svg>
      );
  }
}

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${color}`}
    >
      {initials}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

const RecruiterPage = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0c] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Welcome */}
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Welcome back, {recruiterName}
        </h1>

        {/* Stats */}
        <section
          aria-label="Overview"
          className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <article
              key={stat.id}
              className="rounded-xl border border-white/[0.07] bg-[#111114] p-4 sm:p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-white/80">
                <StatIcon name={stat.icon} />
              </span>
              <p className="mt-5 text-xs text-[#9a9aa3]">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold sm:text-3xl">
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        {/* Recent applications */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold sm:text-xl">
              Recent Applications
            </h2>
            <a
              href="#"
              className="text-xs text-[#a1a1aa] transition-colors hover:text-white"
            >
              View all
            </a>
          </div>

          {/* Desktop / tablet table */}
          <div className="mt-4 hidden overflow-hidden rounded-xl border border-white/[0.07] bg-[#111114] md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-[#8e8e96]">
                <tr>
                  <th className="px-5 py-3 font-medium">Candidate name</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Date applied</th>
                  <th className="px-5 py-3 font-medium">Experience</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={app.name} color={app.color} />
                        <span className="font-medium">{app.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#a1a1aa]">{app.role}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-[#a1a1aa]">
                      {app.date}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-[#a1a1aa]">
                      {app.experience}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="mt-4 space-y-3 md:hidden">
            {applications.map((app) => (
              <li
                key={app.id}
                className="rounded-xl border border-white/[0.07] bg-[#111114] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={app.name} color={app.color} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{app.name}</p>
                      <p className="truncate text-xs text-[#a1a1aa]">
                        {app.role}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs text-[#8e8e96]">
                  <span>{app.date}</span>
                  <span>{app.experience}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Floating action button */}
      <button
        type="button"
        aria-label="Post a new job"
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14 sm:w-14"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </main>
  );
};

export default RecruiterPage;