import { JobsResponse, TcreatejobForm } from "@/types/jobsTypes";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const getJobs = async (
  query = "",
  recruiterId?: string,
): Promise<TcreatejobForm[]> => {
  const params = new URLSearchParams(query);
  if (recruiterId) params.set("recruiterId", recruiterId);
  params.set("limit", "1000");

  const res = await fetch(`${BASE_URL}/jobs?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  const data: JobsResponse = await res.json();
  return data.jobs;
};

export const getJobsPage = async (query = ""): Promise<JobsResponse> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return res.json();
};