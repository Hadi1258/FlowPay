"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { workflowSteps } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type FlowStage = (typeof workflowSteps)[number];

export function FlowAnimation() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const current = workflowSteps[active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % workflowSteps.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const orbStyle = useMemo(
    () =>
      ({
        left: `${current.x}%`,
        top: `${current.y}%`,
      }) as CSSProperties,
    [current],
  );

  const goTo = (index: number) => {
    setActive((index + workflowSteps.length) % workflowSteps.length);
  };

  return (
    <section
      aria-label="Interactive FlowPay workflow animation"
      className="w-full min-w-0 max-w-full rounded-[2rem] border border-[rgba(255,255,255,0.12)] bg-[#17201c] p-3 text-white shadow-[var(--shadow-soft)]"
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1f2a25]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(155,216,201,0.13),transparent_26rem)]" />
        <div className="relative grid min-h-[520px] min-w-0 gap-5 p-5 lg:grid-cols-[0.86fr_1.14fr] lg:p-6">
          <div className="flex flex-col justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9bd8c9]">
                {current.label}
              </p>
              <h2
                aria-live="polite"
                className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl"
              >
                {current.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-white/66">
                {current.description}
              </p>
              <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-medium text-white/76">
                {current.detail}
              </div>
            </div>

            <div className="relative h-28 overflow-hidden rounded-3xl border border-white/10 bg-black/10">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 220"
                preserveAspectRatio="none"
              >
                <path
                  d="M 20 124 C 128 38, 218 38, 318 102 S 500 186, 594 102 S 778 22, 980 112"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeLinecap="round"
                  strokeWidth="14"
                />
                <path
                  className="rail-path"
                  d="M 20 124 C 128 38, 218 38, 318 102 S 500 186, 594 102 S 778 22, 980 112"
                  fill="none"
                  stroke="#9bd8c9"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
              </svg>
              <span
                aria-hidden="true"
                className="motion-orb absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#d9eee8] bg-[#16836f] transition-all duration-700 ease-out"
                style={orbStyle}
              />
            </div>
          </div>

          <div className="flex min-h-[420px] min-w-0 flex-col rounded-[1.35rem] border border-white/10 bg-white p-4 text-[var(--ink)] shadow-2xl">
            <FlowMockup stage={current} />
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-black/10 p-4">
          <div className="grid gap-2 sm:grid-cols-5">
            {workflowSteps.map((step, index) => (
              <button
                aria-current={index === active}
                className={cn(
                  "rounded-2xl border px-3 py-3 text-left text-sm transition-colors",
                  index === active
                    ? "border-[#9bd8c9] bg-[#d9eee8] text-[#0f5d51]"
                    : "border-white/10 bg-white/[0.04] text-white/62 hover:bg-white/[0.08]",
                )}
                key={step.key}
                onClick={() => goTo(index)}
                type="button"
              >
                <span className="block text-xs font-semibold uppercase tracking-[0.12em]">
                  0{index + 1}
                </span>
                <span className="mt-1 block font-semibold">{step.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                className="rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-white/78 transition-colors hover:bg-white/10"
                onClick={() => goTo(active - 1)}
                type="button"
              >
                Back
              </button>
              <button
                className="rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-white/78 transition-colors hover:bg-white/10"
                onClick={() => setPaused((value) => !value)}
                type="button"
                aria-pressed={paused}
              >
                {paused ? "Play" : "Pause"}
              </button>
              <button
                className="rounded-full bg-[#d9eee8] px-4 py-2 text-sm font-semibold text-[#0f5d51] transition-colors hover:bg-white"
                onClick={() => goTo(active + 1)}
                type="button"
              >
                Next
              </button>
            </div>
            <p className="text-xs text-white/48">
              Autoplay slows down and stops for reduced motion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowMockup({ stage }: { stage: FlowStage }) {
  if (stage.key === "request") {
    return (
      <MockupFrame title="Inbound request">
        <div className="rounded-2xl bg-[var(--background)] p-4">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-full bg-[var(--blue-soft)]" />
            <div>
              <strong className="block text-sm">Jordan Lee</strong>
              <span className="text-xs text-[var(--muted)]">New payment request</span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
            We need to collect payment for the implementation package and verify
            the signer before tomorrow.
          </p>
        </div>
        <StatusRows rows={["Owner assigned", "Company matched", "Value detected"]} />
      </MockupFrame>
    );
  }

  if (stage.key === "workspace") {
    return (
      <MockupFrame title="Quote workspace">
        <div className="grid gap-3">
          {[
            ["Implementation", "$4,800", "Approved"],
            ["Verification", "$260", "Ready"],
            ["Platform", "$1,200", "Draft"],
          ].map(([item, amount, state]) => (
            <div
              className="grid grid-cols-[1fr_auto] rounded-2xl border border-[var(--line)] p-4"
              key={item}
            >
              <div>
                <strong className="block text-sm">{item}</strong>
                <span className="text-xs text-[var(--muted)]">{state}</span>
              </div>
              <strong>{amount}</strong>
            </div>
          ))}
        </div>
      </MockupFrame>
    );
  }

  if (stage.key === "payment") {
    return (
      <MockupFrame title="Payment link">
        <div className="rounded-3xl bg-[#17201c] p-5 text-white">
          <p className="text-sm text-white/60">flowpay.link/acme-setup</p>
          <strong className="mt-4 block text-4xl tracking-[-0.05em]">
            $6,260
          </strong>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
            {["Card", "Wallet", "Bank"].map((method) => (
              <span className="rounded-full bg-white/10 px-3 py-2" key={method}>
                {method}
              </span>
            ))}
          </div>
        </div>
        <StatusRows rows={["Terms attached", "Link previewed", "Customer sent"]} />
      </MockupFrame>
    );
  }

  if (stage.key === "verify") {
    return (
      <MockupFrame title="Verification">
        <StatusRows
          rows={[
            "Signer identity verified",
            "Payment source cleared",
            "Finance approval recorded",
            "Risk threshold accepted",
          ]}
        />
      </MockupFrame>
    );
  }

  return (
    <MockupFrame title="Confirmation">
      <div className="grid place-items-center rounded-3xl bg-[var(--accent-soft)] p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-2xl font-semibold text-white">
          OK
        </span>
        <strong className="mt-5 text-2xl tracking-[-0.04em]">
          Payment confirmed
        </strong>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Receipt, audit trail, and next-step handoff are ready for the team.
        </p>
      </div>
    </MockupFrame>
  );
}

function MockupFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
        <strong className="text-sm font-semibold">{title}</strong>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-dark)]">
          Active
        </span>
      </div>
      <div className="mt-4 grid flex-1 content-start gap-4">{children}</div>
    </>
  );
}

function StatusRows({ rows }: { rows: string[] }) {
  return (
    <div className="grid gap-3">
      {rows.map((row) => (
        <div
          className="flex items-center gap-3 rounded-2xl border border-[var(--line)] p-4"
          key={row}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="text-sm font-medium text-[var(--ink-soft)]">{row}</span>
        </div>
      ))}
    </div>
  );
}
