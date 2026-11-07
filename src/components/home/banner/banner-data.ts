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
