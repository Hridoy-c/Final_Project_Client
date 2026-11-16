"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { createApplication } from "@/lib/actions/applications";
import { ApplyJobModalProps, TApplication } from "@/types/applicationsType";



const inputCls =
  "h-10 w-full rounded-lg border border-white/[0.07] bg-[#18181b] px-3 text-sm text-white placeholder:text-[#6b6b73] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5b4dff]";

const getText = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export default function ApplyJobModal({
  jobId,
  jobTitle,
  company,
  disabled = false,
  alreadyApplied = false,
}: ApplyJobModalProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    if (applied) return;

    if (!user) {
      toast.error("You must be logged in to apply for this job");
      router.push("/sign-in");
      return;
    }

    const role = (user as { role?: string }).role;
    if (role === "recruiter") {
      toast.error("Recruiters cannot apply. Please sign up as a Seeker.");
      return;
    }

    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || applied || !user) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const application: Omit<TApplication, "_id"> = {
      jobId,
      fullName: getText(formData, "fullName"),
      email: getText(formData, "email"),
      phone: getText(formData, "phone"),
      resumeUrl: getText(formData, "resumeUrl"),
      portfolioUrl: getText(formData, "portfolioUrl"),
      expectedSalary: getText(formData, "expectedSalary"),
      coverLetter: getText(formData, "coverLetter"),
      seekerId: user.id,
      seekerEmail: user.email,
      applyDate: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      await createApplication(application);

      setApplied(true); // এরপর আর Apply চাপা যাবে না
      setOpen(false);
      toast.success("Applied successfully!");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to submit application.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {applied ? (
        <button
          type="button"
          disabled
          className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-6 py-2.5 text-sm font-semibold text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4" />
          Applied
        </button>
      ) : (
        <button
          type="button"
          disabled={disabled || isPending}
          onClick={handleOpen}
          className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply Now
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-white/[0.07] bg-[#111114] p-5 sm:max-w-lg sm:rounded-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 id="apply-title" className="text-lg font-semibold">
                  Apply for this job
                </h2>
                <p className="mt-1 break-words text-xs text-[#8e8e96]">
                  {jobTitle} · {company}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#8e8e96] hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="fullName" className="text-xs font-medium text-[#e4e4ea]">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  defaultValue={user?.name ?? ""}
                  placeholder="Your full name"
                  className={`${inputCls} mt-1.5`}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-xs font-medium text-[#e4e4ea]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={user?.email ?? ""}
                    placeholder="you@example.com"
                    className={`${inputCls} mt-1.5`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs font-medium text-[#e4e4ea]">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+880..."
                    className={`${inputCls} mt-1.5`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resumeUrl" className="text-xs font-medium text-[#e4e4ea]">
                  Resume link
                </label>
                <input
                  id="resumeUrl"
                  name="resumeUrl"
                  type="url"
                  required
                  placeholder="https://drive.google.com/..."
                  className={`${inputCls} mt-1.5`}
                />
              </div>

              <div>
                <label htmlFor="portfolioUrl" className="text-xs font-medium text-[#e4e4ea]">
                  Portfolio / LinkedIn (optional)
                </label>
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  placeholder="https://..."
                  className={`${inputCls} mt-1.5`}
                />
              </div>

              <div>
                <label htmlFor="expectedSalary" className="text-xs font-medium text-[#e4e4ea]">
                  Expected salary (optional)
                </label>
                <input
                  id="expectedSalary"
                  name="expectedSalary"
                  type="number"
                  min={0}
                  placeholder="e.g. 1000"
                  className={`${inputCls} mt-1.5`}
                />
              </div>

              <div>
                <label htmlFor="coverLetter" className="text-xs font-medium text-[#e4e4ea]">
                  Cover letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={5}
                  required
                  placeholder="Why are you a good fit for this role?"
                  className="mt-1.5 w-full resize-none rounded-lg border border-white/[0.07] bg-[#18181b] px-3 py-2.5 text-sm text-white placeholder:text-[#6b6b73] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5b4dff]"
                />
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-10 rounded-lg border border-white/[0.07] px-5 text-sm text-[#c4c4cc] hover:bg-white/[0.06]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200 disabled:opacity-60"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Submitting..." : "Submit application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}