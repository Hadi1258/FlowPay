import { NextResponse } from "next/server";
import { saveTrialLead } from "@/lib/trial-store";
import { validateTrialPayload } from "@/lib/trial";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Send a valid JSON request body.",
        errors: {},
      },
      { status: 400 },
    );
  }

  const validation = validateTrialPayload(body);

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Review the highlighted fields and try again.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  let lead;

  try {
    lead = await saveTrialLead(validation.payload);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Trial requests are temporarily unavailable.",
        errors: {},
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      leadId: lead.id,
      message: "Your trial request is validated and ready for storage.",
    },
    { status: 201 },
  );
}
