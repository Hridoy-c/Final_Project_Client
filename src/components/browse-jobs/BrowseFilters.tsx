"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, MapPin, RotateCcw } from "lucide-react";

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

const FILTER_KEYS = [
  "type",
  "category",
  "isRemote",
  "location",
  "minSalary",
  "maxSalary",
  "frequency",
  "postedWithin",
  "hideExpired",
];

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
  defaultChecked,
}: {
  label: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xs text-[#9a9aa3]">
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
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
}: {
  label: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xs text-[#9a9aa3]">
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full border border-white/20 bg-[#18181b] checked:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff]"
        />
        <span className="pointer-events-none relative h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
      </span>
      <span className="flex-1">{label}</span>
    </label>
  );
}

function SelectBox({
  name,
  defaultValue,
  children,
}: {
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={`${inputClass} appearance-none pr-8`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8e8e96]" />
    </div>
  );
}

export default function BrowseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = (name: string) => searchParams.get(name) ?? "";

  const [filters, setFilters] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      FILTER_KEYS.map((key) => [key, searchParams.get(key) ?? ""]).filter(
        ([, value]) => value,
      ),
    ),
  );

  const pushParams = (params: URLSearchParams) => {
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;

    const isCheckbox = target instanceof HTMLInputElement && target.type === "checkbox";
    const nextValue = isCheckbox ? (target.checked ? value : "") : value;

    setFilters((prev) => ({ ...prev, [name]: nextValue }));

    if (type === "text" || type === "number") return;

    const params = new URLSearchParams(searchParams.toString());
    if (nextValue) params.set(name, nextValue);
    else params.delete(name);

    pushParams(params);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => params.delete(key));

    Object.entries(filters).forEach(([key, value]) => {
      if (value.trim()) params.set(key, value.trim());
    });

    pushParams(params);
  };

  const handleReset = () => {
    setFilters({});

    const params = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => params.delete(key));

    pushParams(params);
  };

  return (
    <aside className="h-fit rounded-2xl border border-white/[0.07] bg-[#111114] p-5">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="space-y-5"
      >
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

        <Group title="Job Type">
          <ul className="space-y-3">
            {[{ label: "All types", value: "" }, ...jobTypes.map((t) => ({ label: t, value: t }))].map(
              (type) => (
                <li key={type.value || "all"}>
                  <RadioRow
                    label={type.label}
                    name="type"
                    value={type.value}
                    defaultChecked={get("type") === type.value}
                  />
                </li>
              ),
            )}
          </ul>
        </Group>

        <Group title="Category">
          <ul className="space-y-3">
            {[{ label: "All categories", value: "" }, ...categories.map((c) => ({ label: c, value: c }))].map(
              (category) => (
                <li key={category.value || "all"}>
                  <RadioRow
                    label={category.label}
                    name="category"
                    value={category.value}
                    defaultChecked={get("category") === category.value}
                  />
                </li>
              ),
            )}
          </ul>
        </Group>

        <Group title="Work Mode">
          <CheckRow
            label="Remote only"
            name="isRemote"
            value="true"
            defaultChecked={get("isRemote") === "true"}
          />
        </Group>

        <Group title="Location">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8e8e96]" />
            <input
              type="text"
              name="location"
              placeholder="City or country"
              aria-label="Location"
              defaultValue={get("location")}
              className={`${inputClass} pl-9`}
            />
          </div>
        </Group>

        <Group title="Salary">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minSalary"
              min={0}
              inputMode="decimal"
              placeholder="Min"
              aria-label="Minimum salary"
              defaultValue={get("minSalary")}
              className={inputClass}
            />
            <input
              type="number"
              name="maxSalary"
              min={0}
              inputMode="decimal"
              placeholder="Max"
              aria-label="Maximum salary"
              defaultValue={get("maxSalary")}
              className={inputClass}
            />
          </div>

          <div className="mt-2">
            <SelectBox name="frequency" defaultValue={get("frequency")}>
              <option value="">Any frequency</option>
              {frequencies.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </SelectBox>
          </div>
        </Group>

        <Group title="Date Posted">
          <SelectBox name="postedWithin" defaultValue={get("postedWithin")}>
            {postedWithinOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectBox>
        </Group>

        <Group title="Deadline">
          <CheckRow
            label="Hide expired jobs"
            name="hideExpired"
            value="true"
            defaultChecked={get("hideExpired") === "true"}
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