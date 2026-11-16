const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";


  export const getApplications = async () => {
    const res = await fetch(`${BASE_URL}/applications`, { cache: "no-store" });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch applications: ${res.status}`);
    }
  
    return res.json();
  }