 export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
 export type TcreatejobForm = {
  title: string;
  company: string;
  category: string;
  type: JobType;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  requirements: string;
};
