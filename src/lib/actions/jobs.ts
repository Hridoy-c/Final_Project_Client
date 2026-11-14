import { TcreatejobForm } from "@/types/jobsTypes";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const createJob = async (
  jobData: TcreatejobForm,
): Promise<TcreatejobForm> => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return res.json();
};

export const updateJob = async (jobId: string |  undefined , jobData: TcreatejobForm): Promise<TcreatejobForm> => {
  const res  = await fetch(`${BASE_URL}/jobs/${jobId}  `, {
   method: "PATCH",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(jobData),
 });
return res.json();
}

export const deleteJob = async (jobId: string) => {
  const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  });

   if (!response.ok) {
    throw new Error(`Failed to delete job (${response.status})`);
  }

  return response.json();
};
