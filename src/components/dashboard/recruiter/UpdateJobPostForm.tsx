"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Building2,
  Calendar,
  Euro,
  Globe,
  MapPin,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { JobType, TcreatejobForm } from "@/types/jobsTypes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const jobTypes: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const categories = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Product",
  "Finance",
  "Customer Support",
];

const frequencies = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
];

const fieldClass =
  "h-11 border-0 bg-[#1a1a1d] text-sm text-white placeholder:text-[#6b6b73] focus-visible:ring-1 focus-visible:ring-[#5b4dff]";
const textareaClass =
  "border-0 bg-[#1a1a1d] text-sm leading-6 text-white placeholder:text-[#6b6b73] focus-visible:ring-1 focus-visible:ring-[#5b4dff]";
const labelClass = "text-xs font-normal text-[#c4c4cc]";
const sectionClass = "space-y-4 rounded-2xl bg-[#111113] p-4";
const selectContentClass = "border-white/10 bg-[#1a1a1d] text-white";

function Required() {
  return <span className="text-[#5b4dff]"> *</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-medium text-white">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5b4dff]" />
      {children}
    </h3>
  );
}

function IconInput({
  icon,
  ...props
}: { icon: React.ReactNode } & React.ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8e96]">
        {icon}
      </span>
      <Input {...props} className={`${fieldClass} pl-9`} />
    </div>
  );
}

type FormData = Omit<TcreatejobForm, "_id">;

function toFormData(job: TcreatejobForm): FormData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...rest } = job;
  return rest;
}

const UpdateJobPostForm = ({ job }: { job: TcreatejobForm }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>(toFormData(job));

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleOpenChange = (next: boolean) => {
    if (next) setForm(toFormData(job));
    setOpen(next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${job._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      toast.success("Job updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update job",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#1d1b2e] px-3 text-xs font-medium text-[#a99fff] transition-colors hover:bg-[#5b4dff]/25"
          />
        }
      >
        <Pencil className="h-3.5 w-3.5" />
        Update
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0c0c0e] p-5 text-white sm:max-w-3xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Update Job Post
          </DialogTitle>
          <DialogDescription className="text-xs text-[#8e8e96]">
            Modify position specifications, compensation range, and candidate
            requirements for this listing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Basic information */}
          <section className={sectionClass}>
            <SectionTitle>1. Basic Information</SectionTitle>

            <div className="space-y-2">
              <Label htmlFor={`title-${job._id}`} className={labelClass}>
                Job Title
                <Required />
              </Label>
              <Input
                id={`title-${job._id}`}
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`company-${job._id}`} className={labelClass}>
                  Company Name
                  <Required />
                </Label>
                <IconInput
                  id={`company-${job._id}`}
                  required
                  icon={<Building2 className="h-4 w-4" />}
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>
                  Job Category
                  <Required />
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => update("category", v as string)}
                >
                  <SelectTrigger className={`${fieldClass} w-full`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className={labelClass}>
                Job Type
                <Required />
              </Label>
              <div
                role="radiogroup"
                aria-label="Job type"
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {jobTypes.map((type) => {
                  const active = form.type === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => update("type", type)}
                      className={`h-11 rounded-lg border text-xs font-medium transition-colors ${
                        active
                          ? "border-[#5b4dff] bg-[#1d1b2e] text-white"
                          : "border-transparent bg-[#1a1a1d] text-[#8e8e96] hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 2. Location, compensation & timeline */}
          <section className={sectionClass}>
            <SectionTitle>
              2. Location, Compensation &amp; Timeline
            </SectionTitle>

            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#1a1a1d] p-3">
              <div className="flex min-w-0 items-center gap-3">
                <Globe className="h-5 w-5 shrink-0 text-[#8a7dff]" />
                <div className="min-w-0">
                  <Label
                    htmlFor={`remote-${job._id}`}
                    className="text-xs font-medium text-white"
                  >
                    Remote Work Allowed (isRemote)
                  </Label>
                  <p className="text-[11px] text-[#8e8e96]">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>
              <Switch
                id={`remote-${job._id}`}
                checked={form.isRemote}
                onCheckedChange={(v) => update("isRemote", v)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`location-${job._id}`} className={labelClass}>
                    Job Location (location)
                  </Label>
                  <span className="text-[10px] text-[#6b6b73]">
                    {form.isRemote ? "Optional" : "Required"}
                  </span>
                </div>
                <IconInput
                  id={`location-${job._id}`}
                  required={!form.isRemote}
                  icon={<MapPin className="h-4 w-4" />}
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`deadline-${job._id}`} className={labelClass}>
                  Application Deadline (deadline)
                </Label>
                <IconInput
                  id={`deadline-${job._id}`}
                  type="date"
                  icon={<Calendar className="h-4 w-4" />}
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={`min-${job._id}`} className={labelClass}>
                  Min Salary / Rate
                </Label>
                <IconInput
                  id={`min-${job._id}`}
                  type="number"
                  min={0}
                  inputMode="decimal"
                  icon={<Euro className="h-4 w-4" />}
                  value={form.minSalary}
                  onChange={(e) => update("minSalary", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`max-${job._id}`} className={labelClass}>
                  Max Salary / Rate
                </Label>
                <IconInput
                  id={`max-${job._id}`}
                  type="number"
                  min={0}
                  inputMode="decimal"
                  icon={<Euro className="h-4 w-4" />}
                  value={form.maxSalary}
                  onChange={(e) => update("maxSalary", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className={labelClass}>Frequency</Label>
                <Select
                  value={form.frequency}
                  onValueChange={(v) => update("frequency", v as string)}
                >
                  <SelectTrigger className={`${fieldClass} w-full`}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {frequencies.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* 3. Responsibilities & requirements */}
          <section className={sectionClass}>
            <SectionTitle>3. Responsibilities &amp; Requirements</SectionTitle>

            <div className="space-y-2">
              <Label htmlFor={`resp-${job._id}`} className={labelClass}>
                Key Responsibilities
                <Required />
              </Label>
              <Textarea
                id={`resp-${job._id}`}
                required
                rows={4}
                value={form.responsibilities}
                onChange={(e) => update("responsibilities", e.target.value)}
                className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`req-${job._id}`} className={labelClass}>
                Qualifications &amp; Requirements
                <Required />
              </Label>
              <Textarea
                id={`req-${job._id}`}
                required
                rows={4}
                value={form.requirements}
                onChange={(e) => update("requirements", e.target.value)}
                className={textareaClass}
              />
            </div>
          </section>

          <div className="flex justify-start">
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 gap-2 bg-[#5b4dff] px-6 text-sm text-white shadow-[0_8px_24px_-8px_rgba(91,77,255,0.8)] hover:bg-[#4a3de0]"
            >
              {submitting ? "Updating..." : "Update Job"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateJobPostForm;
