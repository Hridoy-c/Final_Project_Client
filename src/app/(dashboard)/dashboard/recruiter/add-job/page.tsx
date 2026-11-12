"use client";

import React, { useState } from "react";
import { ArrowRight, Building2, Calendar, Euro, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/*                                Static options                              */
/* -------------------------------------------------------------------------- */

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const;

const categories = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Product",
  "Finance",
  "Customer Support",
];

const frequencies = ["per hour", "per day", "per week", "per month", "per year"];


type JobForm = {
  title: string;
  company: string;
  category: string;
  type: (typeof jobTypes)[number];
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  requirements: string;
};


const fieldClass =
  "h-11 border-0 bg-[#1a1a1d] text-sm text-white placeholder:text-[#6b6b73] focus-visible:ring-1 focus-visible:ring-[#5b4dff]";
const textareaClass =
  "border-0 bg-[#1a1a1d] text-sm leading-6 text-white placeholder:text-[#6b6b73] focus-visible:ring-1 focus-visible:ring-[#5b4dff]";
const labelClass = "text-xs font-normal text-[#c4c4cc]";
const sectionClass =
  "space-y-5 rounded-2xl bg-[#111113] p-4 sm:p-6";

function Required() {
  return <span className="text-[#5b4dff]"> *</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-medium text-white">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5b4dff]" />
      {children}
    </h2>
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

const selectContentClass = "border-white/10 bg-[#1a1a1d] text-white";

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

const AddJobPage = () => {
  const [form, setForm] = useState<JobForm>({
    title: "",
    company: "",
    category: "",
    type: "Full-time",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    frequency: "",
    responsibilities: "",
    requirements: "",
  });


  const update = <K extends keyof JobForm>(key: K, value: JobForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: write your submit logic here (form values are in `form`)

    const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log("Job created:", data);

   
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] px-4 py-8 text-white sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] text-[#8e8e96]">
              Manage Jobs <span className="mx-0.5">&gt;</span>{" "}
              <span className="text-[#8a7dff]">Create New Listing</span>
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Post a New Job
            </h1>
            <p className="mt-1 max-w-md text-xs text-[#8e8e96]">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
        </header>

        {/* 1. Basic information */}
        <section className={sectionClass}>
          <SectionTitle>1. Basic Information</SectionTitle>

          <div className="space-y-2">
            <Label htmlFor="title" className={labelClass}>
              Job Title
              <Required />
            </Label>
            <Input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company" className={labelClass}>
                Company Name
                <Required />
              </Label>
              <IconInput
                id="company"
                name="company"
                required
                icon={<Building2 className="h-4 w-4" />}
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className={labelClass}>
                Job Category
                <Required />
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => update("category", v as JobForm["category"])}
              >
                <SelectTrigger id="category" className={`${fieldClass} w-full`}>
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
                    className={`h-11 rounded-lg border text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff] ${
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
          <SectionTitle>2. Location, Compensation &amp; Timeline</SectionTitle>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-[#1a1a1d] p-3 sm:p-4">
            <div className="flex min-w-0 items-center gap-3">
              <Globe className="h-5 w-5 shrink-0 text-[#8a7dff]" />
              <div className="min-w-0">
                <Label htmlFor="isRemote" className="text-xs font-medium text-white">
                  Remote Work Allowed (isRemote)
                </Label>
                <p className="text-[11px] text-[#8e8e96]">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              id="isRemote"
              checked={form.isRemote}
              onCheckedChange={(v) => update("isRemote", v)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="location" className={labelClass}>
                  Job Location (location)
                </Label>
                <span className="text-[10px] text-[#6b6b73]">Required</span>
              </div>
              <IconInput
                id="location"
                name="location"
                required={!form.isRemote}
                icon={<MapPin className="h-4 w-4" />}
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline" className={labelClass}>
                Application Deadline (deadline)
              </Label>
              <IconInput
                id="deadline"
                name="deadline"
                type="date"
                icon={<Calendar className="h-4 w-4" />}
                value={form.deadline}
                onChange={(e) => update("deadline", e.target.value)}
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="minSalary" className={labelClass}>
                Min Salary / Rate
              </Label>
              <IconInput
                id="minSalary"
                name="minSalary"
                type="number"
                min={0}
                inputMode="decimal"
                icon={<Euro className="h-4 w-4" />}
                value={form.minSalary}
                onChange={(e) => update("minSalary", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxSalary" className={labelClass}>
                Max Salary / Rate
              </Label>
              <IconInput
                id="maxSalary"
                name="maxSalary"
                type="number"
                min={0}
                inputMode="decimal"
                icon={<Euro className="h-4 w-4" />}
                value={form.maxSalary}
                onChange={(e) => update("maxSalary", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency" className={labelClass}>
                Frequency
              </Label>
              <Select
                value={form.frequency}
                onValueChange={(v) => update("frequency", v as JobForm["frequency"])}
              >
                <SelectTrigger id="frequency" className={`${fieldClass} w-full`}>
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
            <Label htmlFor="responsibilities" className={labelClass}>
              Key Responsibilities
              <Required />
            </Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              required
              rows={4}
              value={form.responsibilities}
              onChange={(e) => update("responsibilities", e.target.value)}
              className={textareaClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className={labelClass}>
              Qualifications &amp; Requirements
              <Required />
            </Label>
            <Textarea
              id="requirements"
              name="requirements"
              required
              rows={5}
              value={form.requirements}
              onChange={(e) => update("requirements", e.target.value)}
              className={textareaClass}
            />
          </div>
        </section>

        {/* Publish button: bottom right, wider */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="h-12 w-full gap-2 bg-[#5b4dff] px-10 text-base text-white shadow-[0_8px_24px_-8px_rgba(91,77,255,0.8)] hover:bg-[#4a3de0] sm:w-72"
          >
            Publish Job
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddJobPage;