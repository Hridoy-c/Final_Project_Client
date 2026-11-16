export type TApplication = {
  _id?: string;
  jobId?: string;
  jobTitle?: string;
  company?: string;
  jobType?: string;
  workMode?: string;
  status?: ApplicationStatus;
  fullName: string;
  email: string;
  phone: string;
  expectedSalary: string;
  coverLetter: string;
  resumeUrl: string;
  portfolioUrl: string;
  applyDate: string;
  seekerId: string;
  seekerEmail: string;
};
export type ApplyJobModalProps = {
  jobId: string;
  jobTitle: string;
  company: string;
  disabled?: boolean;
  alreadyApplied?: boolean; // সার্ভার থেকে জানা থাকলে true পাঠান
};

export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Offered";

