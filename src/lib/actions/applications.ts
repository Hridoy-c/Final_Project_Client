import { TApplication } from "@/types/applicationsType";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";


export const createApplication = async (applicationData: TApplication): Promise<TApplication> => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });
  return res.json();
};  