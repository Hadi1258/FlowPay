import type { WorkflowStatus } from "@/lib/database.types";

export const workflowStatuses: WorkflowStatus[] = [
  "request",
  "quote",
  "payment",
  "verification",
  "confirmed",
  "cancelled",
];

export const workflowStatusLabels: Record<WorkflowStatus, string> = {
  request: "Request",
  quote: "Quote",
  payment: "Payment",
  verification: "Verification",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

export function formatMoney(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(amountCents / 100);
}

export function parseAmountToCents(value: FormDataEntryValue | null) {
  const amount = Number(String(value ?? "").replaceAll(",", "."));

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return Math.round(amount * 100);
}
