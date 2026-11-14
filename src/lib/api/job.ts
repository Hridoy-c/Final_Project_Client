import { TcreatejobForm } from "@/types/jobsTypes";


const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getJobs = async (): Promise<TcreatejobForm[]> => {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return res.json();
};