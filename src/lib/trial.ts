export const companySizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"] as const;
export const workflowVolumes = ["0-100", "101-1000", "1001-10000", "10000+"] as const;

export type CompanySize = (typeof companySizes)[number];
export type WorkflowVolume = (typeof workflowVolumes)[number];

export type TrialPayload = {
  name: string;
  workEmail: string;
  company: string;
  role: string;
  companySize: CompanySize;
  workflowVolume: WorkflowVolume;
  message: string;
};

export type TrialFieldErrors = Partial<Record<keyof TrialPayload, string>>;

export type TrialValidationResult =
  | { ok: true; payload: TrialPayload }
  | { ok: false; errors: TrialFieldErrors };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isCompanySize(value: string): value is CompanySize {
  return companySizes.includes(value as CompanySize);
}

function isWorkflowVolume(value: string): value is WorkflowVolume {
  return workflowVolumes.includes(value as WorkflowVolume);
}

export function validateTrialPayload(input: unknown): TrialValidationResult {
  if (!isRecord(input)) {
    return { ok: false, errors: { name: "Submit the form fields again." } };
  }

  const payload = {
    name: clean(input.name),
    workEmail: clean(input.workEmail).toLowerCase(),
    company: clean(input.company),
    role: clean(input.role),
    companySize: clean(input.companySize),
    workflowVolume: clean(input.workflowVolume),
    message: clean(input.message),
  };

  const errors: TrialFieldErrors = {};

  if (payload.name.length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.workEmail)) {
    errors.workEmail = "Enter a valid work email.";
  }
  if (payload.company.length < 2) errors.company = "Enter your company.";
  if (payload.role.length < 2) errors.role = "Enter your role.";
  if (!isCompanySize(payload.companySize)) {
    errors.companySize = "Choose a company size.";
  }
  if (!isWorkflowVolume(payload.workflowVolume)) {
    errors.workflowVolume = "Choose a monthly workflow volume.";
  }
  if (payload.message.length > 700) {
    errors.message = "Keep the message under 700 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    payload: {
      ...payload,
      companySize: payload.companySize as CompanySize,
      workflowVolume: payload.workflowVolume as WorkflowVolume,
    },
  };
}
