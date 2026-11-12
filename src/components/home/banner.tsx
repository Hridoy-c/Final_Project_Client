import Image from "next/image";
import earth from "@/assets/earth-main.png";
import starfield from "@/assets/benner-main.png";

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

export type BannerStatIcon = "briefcase" | "chart" | "users" | "star";

export type BannerStat = {
  id: string;
  label: string;
  value: string;
  icon: BannerStatIcon;
};

export const bannerStats: BannerStat[] = [
  { id: "active-jobs", label: "Active Jobs", value: "50K", icon: "briefcase" },
  { id: "companies", label: "Companies", value: "12K", icon: "chart" },
  { id: "job-seekers", label: "Job Seekers", value: "2M", icon: "users" },
  {
    id: "satisfaction-rate",
    label: "Satisfaction Rate",
    value: "97%",
    icon: "star",
  },
];

export const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

/* -------------------------------------------------------------------------- */
/*                                    Icons                                   */
/* -------------------------------------------------------------------------- */

type IconProps = {
  className?: string;
};

const iconClass = "h-4 w-4 sm:h-[18px] sm:w-[18px]";

function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ToolboxIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BriefcaseIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ChartIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M5 20V11M12 20V4M19 20v-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 5.5a3 3 0 0 1 0 5.8M21 20c0-2.5-1.4-4.6-3.5-5.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon({ className = iconClass }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="m12 3 2.7 5.9 6.3.6-4.8 4.2 1.4 6.2L12 16.8 6.4 20l1.4-6.2L3 9.5l6.3-.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatIcon({
  name,
  className,
}: {
  name: BannerStatIcon;
  className?: string;
}) {
  switch (name) {
    case "briefcase":
      return <BriefcaseIcon className={className} />;
    case "chart":
      return <ChartIcon className={className} />;
    case "users":
      return <UsersIcon className={className} />;
    case "star":
      return <StarIcon className={className} />;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Banner                                   */
/* -------------------------------------------------------------------------- */

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#08080a]">
      {/* Starfield backdrop */}
      <Image
        src={starfield}
        alt=""
        fill
        preload
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#08080a_0%,rgba(8,8,10,0.55)_18%,rgba(8,8,10,0.15)_45%,rgba(8,8,10,0.65)_72%,#08080a_100%)]"
      />

      {/* Hero copy + search */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:pt-24">
        <div className="mx-auto flex w-full max-w-lg items-center gap-3">
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"
          />
          <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8e8e96] sm:text-[11px] sm:tracking-[0.18em]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-[#3a2109] text-[#ff8a00]">
              <ToolboxIcon className="h-3 w-3" />
            </span>
            <span className="whitespace-nowrap font-semibold text-[#f97316]">
              50,000+
            </span>
            <span className="whitespace-nowrap">New Jobs This Month</span>
          </p>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"
          />
        </div>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#a1a1aa] sm:text-base sm:leading-7">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form
          role="search"
          className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#0c0c10]/90 p-2 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md sm:mt-10 sm:flex-row sm:items-center sm:gap-1 sm:rounded-xl sm:p-1.5"
        >
          <div className="flex flex-1 items-center gap-2.5 px-3 py-2.5 sm:px-4">
            <SearchIcon className="h-4 w-4 shrink-0 text-[#8e8e96]" />
            <input
              type="search"
              name="query"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="w-full min-w-0 bg-transparent text-base text-white placeholder:text-[#8e8e96] focus:outline-none sm:text-sm"
            />
          </div>

          <span
            aria-hidden
            className="mx-3 h-px shrink-0 bg-white/10 sm:mx-0 sm:h-7 sm:w-px"
          />

          <div className="flex flex-1 items-center gap-2.5 px-3 py-2.5 sm:px-4">
            <PinIcon className="h-4 w-4 shrink-0 text-[#8e8e96]" />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="w-full min-w-0 bg-transparent text-base text-white placeholder:text-[#8e8e96] focus:outline-none sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#5b4dff] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4a3de0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff] sm:w-11 sm:px-0"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="sm:hidden">Search</span>
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5 text-[11px] text-[#8e8e96] sm:mt-6 sm:text-xs">
          <span className="mr-1">Trending Position</span>
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-[#d6d6dc] transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white sm:text-xs"
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      {/* Assistance copy */}
      <div className="relative z-10 mx-auto mt-16 max-w-3xl px-6 text-center sm:mt-24 lg:mt-28">
        <p className="text-balance text-lg font-normal leading-snug text-[#eaeaef] [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_6px_30px_rgba(0,0,0,0.9)] sm:text-2xl lg:text-3xl">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
      </div>

      {/* Stats */}
      <div className="relative z-10 mx-auto mt-8 max-w-[90vw] px-4 pb-16 sm:mt-12 sm:px-6 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {bannerStats.map((stat) => (
            <article
              key={stat.id}
              className="flex min-h-[128px] flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#0b0b0e]/75 p-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md sm:min-h-[150px] sm:p-5"
            >
              <span className="text-white/75">
                <StatIcon name={stat.icon} />
              </span>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[42px]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[#a1a1aa] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Earth Horizon with seamless edge alignment & atmospheric blending */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden"
      >
        <div className="relative left-1/2 w-[240%] sm:w-[180%] md:w-[150%] lg:w-[130%] xl:w-[118%] 2xl:w-[112%] min-w-full -translate-x-1/2">
          {/* Ambient atmospheric backlight glow behind Earth's upper rim */}
          <div className="absolute left-1/2 top-[38%] h-[32%] w-[80%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(109,93,252,0.45),rgba(70,90,230,0.22)_48%,transparent_75%)] mix-blend-screen blur-3xl" />

          {/* Earth image with feathered alpha and soft top-rim drop-shadow */}
          <Image
            src={earth}
            alt=""
            priority
            sizes="(min-width: 1536px) 115vw, (min-width: 1280px) 120vw, (min-width: 1024px) 130vw, (min-width: 768px) 150vw, (min-width: 640px) 180vw, 240vw"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%)",
            }}
            className="relative h-auto w-full select-none [filter:drop-shadow(0_-12px_28px_rgba(8,8,10,0.95))_drop-shadow(0_-4px_35px_rgba(109,93,252,0.35))]"
          />

          {/* Surface depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/80 via-[#08080a]/20 to-transparent" />

          {/* Secondary atmospheric soft bloom */}
          <div className="absolute left-1/2 top-[44%] h-[18%] w-[90%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.3),rgba(59,130,246,0.12)_50%,transparent_75%)] mix-blend-screen blur-2xl" />

          {/* Bottom fade into section background */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent sm:h-44" />
        </div>

        {/* Viewport edge blending vignettes so left and right transitions are completely imperceptible */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#08080a] via-[#08080a]/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#08080a] via-[#08080a]/40 to-transparent" />
      </div>
    </section>
  );
}