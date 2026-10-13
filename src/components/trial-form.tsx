"use client";

import { useState } from "react";
import {
  companySizes,
  type TrialFieldErrors,
  type TrialPayload,
  workflowVolumes,
} from "@/lib/trial";

type TrialResponse =
  | { ok: true; leadId: string; message: string }
  | { ok: false; message: string; errors: TrialFieldErrors };

const initialFields: TrialPayload = {
  name: "",
  workEmail: "",
  company: "",
  role: "",
  companySize: "1-10",
  workflowVolume: "0-100",
  message: "",
};

export function TrialForm() {
  const [fields, setFields] = useState<TrialPayload>(initialFields);
  const [errors, setErrors] = useState<TrialFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const updateField = (field: keyof TrialPayload, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    const response = await fetch("/api/trial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const result = (await response.json()) as TrialResponse;

    if (!result.ok) {
      setErrors(result.errors);
      setMessage(result.message);
      setStatus("idle");
      return;
    }

    setStatus("success");
    setMessage(`${result.message} Reference: ${result.leadId.slice(0, 8)}.`);
    setFields(initialFields);
  };

  return (
    <form
      className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[var(--shadow-card)] sm:p-7"
      onSubmit={submit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            className="form-field"
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            required
            value={fields.name}
          />
        </Field>
        <Field label="Work email" error={errors.workEmail}>
          <input
            className="form-field"
            name="workEmail"
            onChange={(event) => updateField("workEmail", event.target.value)}
            required
            type="email"
            value={fields.workEmail}
          />
        </Field>
        <Field label="Company" error={errors.company}>
          <input
            className="form-field"
            name="company"
            onChange={(event) => updateField("company", event.target.value)}
            required
            value={fields.company}
          />
        </Field>
        <Field label="Role" error={errors.role}>
          <input
            className="form-field"
            name="role"
            onChange={(event) => updateField("role", event.target.value)}
            required
            value={fields.role}
          />
        </Field>
        <Field label="Company size" error={errors.companySize}>
          <select
            className="form-field"
            name="companySize"
            onChange={(event) => updateField("companySize", event.target.value)}
            value={fields.companySize}
          >
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </select>
        </Field>
        <Field label="Monthly workflow volume" error={errors.workflowVolume}>
          <select
            className="form-field"
            name="workflowVolume"
            onChange={(event) =>
              updateField("workflowVolume", event.target.value)
            }
            value={fields.workflowVolume}
          >
            {workflowVolumes.map((volume) => (
              <option key={volume} value={volume}>
                {volume} workflows
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field className="mt-4" label="What should FlowPay help with?" error={errors.message}>
        <textarea
          className="form-field min-h-32 resize-y py-3"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          value={fields.message}
        />
      </Field>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)] disabled:cursor-wait disabled:opacity-70"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Submitting..." : "Start free trial"}
        </button>
        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-[var(--accent-dark)]" : "text-red-700"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-semibold text-[var(--ink)]">{label}</span>
      {children}
      {error ? <span className="text-xs font-medium text-red-700">{error}</span> : null}
    </label>
  );
}
