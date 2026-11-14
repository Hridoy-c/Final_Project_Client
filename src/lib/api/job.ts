import { TcreatejobForm } from "@/types/jobsTypes";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getJobs = async (
  recruiterId?: string,
): Promise<TcreatejobForm[]> => {
  const url = recruiterId
    ? `${BASE_URL}/jobs?recruiterId=${encodeURIComponent(recruiterId)}`
    : `${BASE_URL}/jobs`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }
  console.log(res); 

  return res.json();
};