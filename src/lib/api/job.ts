import { TcreatejobForm } from "@/types/jobsTypes";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const getJobs = async (
  query = "",
  recruiterId?: string,
): Promise<TcreatejobForm[]> => {
   const params = new URLSearchParams(query);
  if (recruiterId) params.set("recruiterId", recruiterId);

  const url = `${BASE_URL}/jobs?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return res.json();
};


