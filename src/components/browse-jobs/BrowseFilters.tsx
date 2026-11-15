"use client";

import React from "react";
import { Check, ChevronDown, MapPin, RotateCcw } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                          Filter options (from DB)                          */
/* -------------------------------------------------------------------------- */

// Same values you use in add-job / update-job forms
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];

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

const postedWithinOptions = [
  { label: "Any time", value: "" },
  { label: "Last 24 hours", value: "1" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
];

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

// Handy shape if you want to keep all filters in one state / URL query
export type JobFilters = {
  type: string; // type ("" = all)
  category: string; // category ("" = all)
  isRemote: boolean; // isRemote
  location: string; // location
  minSalary: string; // minSalary
  maxSalary: string; // maxSalary
  frequency: string; // frequency
  postedWithin: string; // jobPostDate (days)
  hideExpired: boolean; // deadline
};

/* -------------------------------------------------------------------------- */
/*                                Small parts                                 */
/* -------------------------------------------------------------------------- */

const inputClass =
  "h-10 w-full rounded-lg border border-white/[0.07] bg-[#18181b] px-3 text-xs text-white placeholder:text-[#6b6b73] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5b4dff]";

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-white/[0.07] pt-5 first:border-t-0 first:pt-0">
      <legend className="text-sm font-medium text-[#e4e4ea]">{title}</legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

function CheckRow({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xs text-[#9a9aa3]">
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[4px] border border-white/20 bg-[#18181b] checked:border-white checked:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff]"
        />
        <Check
          strokeWidth={3}
          className="pointer-events-none relative h-3 w-3 text-black opacity-0 peer-checked:opacity-100"
        />
      </span>
      <span className="flex-1">{label}</span>
    </label>
  );
}

function RadioRow({
  label,
  name,
  value,
  defaultChecked,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xs text-[#9a9aa3]">
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          onChange={(e) => onChange(e.target.value)}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full border border-white/20 bg-[#18181b] checked:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff]"
        />
        <span className="pointer-events-none relative h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
      </span>
      <span className="flex-1">{label}</span>
    </label>
  );
}

function SelectBox({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-8`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8e8e96]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function BrowseFilters() {
  /* ----------------------------- Event handlers ---------------------------- */
  // All handlers are empty on purpose — add your logic here
  // (update state, push to URL search params with router.push, etc.)

  const handleTypeChange = (type: string) => {
    // TODO: set selected job type ("" means all types)
  };

  const handleCategoryChange = (category: string) => {
    // TODO: set selected category ("" means all categories)
  };

  const handleRemoteChange = (checked: boolean) => {
    // TODO: filter by isRemote
  };

  const handleLocationChange = (value: string) => {
    // TODO: filter by location
  };

  const handleMinSalaryChange = (value: string) => {
    // TODO: filter by minSalary
  };

  const handleMaxSalaryChange = (value: string) => {
    // TODO: filter by maxSalary
  };

  const handleFrequencyChange = (value: string) => {
    // TODO: filter by salary frequency (per hour, per month ...)
  };

  const handlePostedWithinChange = (days: string) => {
    // TODO: filter by jobPostDate (last N days)
  };

  const handleHideExpiredChange = (checked: boolean) => {
    // TODO: hide jobs whose deadline has passed
  };

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: build the query string and navigate (router.push(`?${params}`))
  };

  const handleClear = () => {
    // TODO: reset all filters (the form reset already clears the inputs)
  };

  /* --------------------------------- Render -------------------------------- */

  return (
    <aside className="h-fit rounded-2xl border border-white/[0.07] bg-[#111114] p-5">
      <form onSubmit={handleApply} onReset={handleClear} className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Filters</h2>
          <button
            type="reset"
            className="inline-flex items-center gap-1.5 text-xs text-[#8a7dff] transition-colors hover:text-[#a99fff]"
          >
            <RotateCcw className="h-3 w-3" />
            Clear all
          </button>
        </div>

        {/* Job type */}
        <Group title="Job Type">
          <ul className="space-y-3">
            {[{ label: "All types", value: "" }, ...jobTypes.map((t) => ({ label: t, value: t }))].map(
              (type) => (
                <li key={type.value || "all"}>
                  <RadioRow
                    label={type.label}
                    name="type"
                    value={type.value}
                    defaultChecked={type.value === ""}
                    onChange={handleTypeChange}
                  />
                </li>
              ),
            )}
          </ul>
        </Group>

        {/* Category */}
        <Group title="Category">
          <ul className="space-y-3">
            {[{ label: "All categories", value: "" }, ...categories.map((c) => ({ label: c, value: c }))].map(
              (category) => (
                <li key={category.value || "all"}>
                  <RadioRow
                    label={category.label}
                    name="category"
                    value={category.value}
                    defaultChecked={category.value === ""}
                    onChange={handleCategoryChange}
                  />
                </li>
              ),
            )}
          </ul>
        </Group>

        {/* Work mode */}
        <Group title="Work Mode">
          <CheckRow
            label="Remote only"
            name="isRemote"
            value="true"
            onChange={handleRemoteChange}
          />
        </Group>

        {/* Location */}
        <Group title="Location">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8e8e96]" />
            <input
              type="text"
              name="location"
              placeholder="City or country"
              aria-label="Location"
              onChange={(e) => handleLocationChange(e.target.value)}
              className={`${inputClass} pl-9`}
            />
          </div>
        </Group>

        {/* Salary */}
        <Group title="Salary">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minSalary"
              min={0}
              inputMode="decimal"
              placeholder="Min"
              aria-label="Minimum salary"
              onChange={(e) => handleMinSalaryChange(e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              name="maxSalary"
              min={0}
              inputMode="decimal"
              placeholder="Max"
              aria-label="Maximum salary"
              onChange={(e) => handleMaxSalaryChange(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mt-2">
            <SelectBox id="frequency" onChange={handleFrequencyChange}>
              <option value="">Any frequency</option>
              {frequencies.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </SelectBox>
          </div>
        </Group>

        {/* Date posted */}
        <Group title="Date Posted">
          <SelectBox id="postedWithin" onChange={handlePostedWithinChange}>
            {postedWithinOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectBox>
        </Group>

        {/* Deadline */}
        <Group title="Deadline">
          <CheckRow
            label="Hide expired jobs"
            name="hideExpired"
            value="true"
            onChange={handleHideExpiredChange}
          />
        </Group>

        <button
          type="submit"
          className="h-10 w-full rounded-lg bg-[#5b4dff] text-sm font-medium text-white transition-colors hover:bg-[#4a3de0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff]"
        >
          Apply Filters
        </button>
      </form>
    </aside>
  );
}