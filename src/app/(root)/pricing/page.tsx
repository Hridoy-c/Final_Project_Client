"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

type Billing = "monthly" | "yearly";
type PlanId = "starter" | "pro" | "enterprise";

type Plan = {
  id: PlanId;
  name: string;
  description: string;
  monthly: number;
  yearly: number; // প্রতি মাসের হিসাবে
  featured?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for trying out Hireloop.",
    monthly: 0,
    yearly: 0,
    features: [
      "1 active job post",
      "Up to 20 applicants",
      "Basic candidate profiles",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams that hire often.",
    monthly: 49,
    yearly: 39,
    featured: true,
    features: [
      "15 active job posts",
      "Unlimited applicants",
      "Featured job listings",
      "Applicant tracking dashboard",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For companies with advanced hiring needs.",
    monthly: 149,
    yearly: 119,
    features: [
      "Unlimited job posts",
      "Unlimited applicants",
      "Team collaboration & roles",
      "Advanced analytics",
      "Dedicated account manager",
    ],
  },
];

const faqs = [
  {
    q: "Can I change my plan later?",
    a: "Yes. You can upgrade or downgrade at any time from your dashboard settings.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "You can start on the Starter plan for free and upgrade whenever you are ready.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards.",
  },
];

function PlanCard({
  plan,
  billing,
  selected,
  onSelect,
}: {
  plan: Plan;
  billing: Billing;
  selected: boolean;
  onSelect: () => void;
}) {
  const price = billing === "monthly" ? plan.monthly : plan.yearly;

  return (
    <label
      className={`relative flex h-full cursor-pointer flex-col rounded-2xl border bg-[#111114] p-6 transition-colors focus-within:ring-2 focus-within:ring-[#5b4dff]/40 sm:p-7 ${
        selected
          ? "border-[#5b4dff] shadow-[0_0_60px_-20px_rgba(91,77,255,0.6)]"
          : "border-white/[0.07] hover:border-white/20"
      }`}
    >
      <input
        type="radio"
        name="plan"
        value={plan.id}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />

      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#5b4dff] px-3 py-1 text-[11px] font-medium text-white">
          Most popular
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">{plan.name}</h2>
        <span
          aria-hidden
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected
              ? "border-[#5b4dff] bg-[#5b4dff]"
              : "border-white/20 bg-transparent"
          }`}
        >
          {selected && <Check className="h-3 w-3 text-white" />}
        </span>
      </div>
      <p className="mt-1 text-sm text-[#8e8e96]">{plan.description}</p>

      <p className="mt-6 flex items-end gap-1">
        <span className="text-4xl font-semibold tracking-tight">${price}</span>
        <span className="pb-1 text-sm text-[#8e8e96]">/ month</span>
      </p>
      <p className="mt-1 h-4 text-[11px] text-[#6b6b73]">
        {billing === "yearly" && price > 0 ? "Billed yearly" : ""}
      </p>

      <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-[#b4b4bc]"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8a7dff]" />
            <span className="min-w-0 break-words">{feature}</span>
          </li>
        ))}
      </ul>
    </label>
  );
}

const PricingPage = () => {
  const router = useRouter();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("pro");
  const [submitting, setSubmitting] = useState(false);

  const current = plans.find((p) => p.id === selectedPlan)!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    // এখানে চাইলে payment / API কল বসাতে পারেন
    router.push(`/sign-up?plan=${selectedPlan}&billing=${billing}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="mb-3 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-widest text-gray-300">
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
            Pricing
            <span className="h-1.5 w-1.5 bg-[#5b4dff]" />
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Simple pricing for every team
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#8e8e96] sm:text-base">
            Pick a plan that fits your hiring goals. Upgrade, downgrade or
            cancel anytime.
          </p>

          {/* Billing toggle */}
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="mx-auto mt-8 inline-flex rounded-lg border border-white/[0.07] bg-[#111114] p-1"
          >
            {(["monthly", "yearly"] as Billing[]).map((option) => {
              const active = billing === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setBilling(option)}
                  className={`rounded-md px-4 py-2 text-xs font-medium capitalize transition-colors sm:px-5 sm:text-sm ${
                    active
                      ? "bg-[#5b4dff] text-white"
                      : "text-[#8e8e96] hover:text-white"
                  }`}
                >
                  {option}
                  {option === "yearly" && (
                    <span
                      className={`ml-2 text-[10px] ${
                        active ? "text-white/80" : "text-emerald-400"
                      }`}
                    >
                      Save 20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plans */}
        <fieldset className="mt-12">
          <legend className="sr-only">Choose a plan</legend>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={
                  plan.id === "enterprise" ? "md:col-span-2 lg:col-span-1" : ""
                }
              >
                <PlanCard
                  plan={plan}
                  billing={billing}
                  selected={selectedPlan === plan.id}
                  onSelect={() => setSelectedPlan(plan.id)}
                />
              </div>
            ))}
          </div>
        </fieldset>

        {/* Submit */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="h-12 w-full rounded-lg bg-[#5b4dff] px-10 text-base font-medium text-white shadow-[0_8px_24px_-8px_rgba(91,77,255,0.8)] transition-colors hover:bg-[#4a3de0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a7dff] disabled:cursor-not-allowed disabled:opacity-60 sm:w-80"
          >
            {submitting ? "Please wait..." : `Continue with ${current.name}`}
          </button>
        </div>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-3xl sm:mt-20">
          <h2 className="text-center text-xl font-semibold sm:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-[#111114]">
            {faqs.map((item) => (
              <div key={item.q} className="p-5 sm:p-6">
                <h3 className="text-sm font-medium sm:text-base">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8e8e96]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </form>
    </main>
  );
};

export default PricingPage;