export const navItems = [
  { href: "/product", label: "Product" },
  { href: "/workflow", label: "Workflow" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const homeMetrics = [
  { value: "5", label: "clear workflow states" },
  { value: "1", label: "shared payment workspace" },
  { value: "0", label: "neon distractions" },
] as const;

export const platformPillars = [
  {
    index: "01",
    title: "Capture",
    description:
      "Bring inbound requests, customer details, files, and owner context into one qualified intake.",
  },
  {
    index: "02",
    title: "Compose",
    description:
      "Build quotes with payment terms, approvals, verification needs, and handoff notes in view.",
  },
  {
    index: "03",
    title: "Confirm",
    description:
      "Send the payment link, verify the customer, and close the loop with a durable audit trail.",
  },
] as const;

export const workflowSteps = [
  {
    key: "request",
    label: "Request",
    title: "Request captured",
    description:
      "FlowPay converts a customer message into structured intake with owner, value, and urgency.",
    detail: "Qualified in 2 minutes",
    x: 7,
    y: 56,
  },
  {
    key: "workspace",
    label: "Workspace",
    title: "Quote assembled",
    description:
      "Pricing, terms, approvals, and supporting documents sit in one readable workspace.",
    detail: "3 internal checks ready",
    x: 29,
    y: 37,
  },
  {
    key: "payment",
    label: "Payment",
    title: "Payment link sent",
    description:
      "The customer receives a focused payment experience with clear amount, terms, and methods.",
    detail: "Card, wallet, or bank",
    x: 52,
    y: 53,
  },
  {
    key: "verify",
    label: "Verify",
    title: "Identity verified",
    description:
      "Risk checks and approvals update the same timeline instead of living in separate tools.",
    detail: "Checks complete",
    x: 74,
    y: 33,
  },
  {
    key: "confirm",
    label: "Confirm",
    title: "Payment confirmed",
    description:
      "The team sees the final state, receipt, audit trail, and next operational step.",
    detail: "Receipt and audit trail",
    x: 94,
    y: 52,
  },
] as const;

export const productFeatures = [
  "Shared request inbox with qualification status",
  "Payment workspace with terms, approvals, and attachments",
  "Customer-facing links that explain the payment clearly",
  "Operational timeline for handoffs, notes, and state changes",
  "Database-ready trial lead model for future production storage",
  "Reduced-motion support and manual animation controls",
] as const;

export const securityFeatures = [
  {
    title: "Verification states",
    description:
      "Identity, payment, and internal approvals are visible as separate checks, not hidden behind one vague status.",
  },
  {
    title: "Audit-ready timeline",
    description:
      "Every quote edit, payment link, verification event, and confirmation is written as a clear operational event.",
  },
  {
    title: "Controlled handoffs",
    description:
      "Teams can see who owns the next action and which payment or verification condition is blocking progress.",
  },
  {
    title: "Sensitive by design",
    description:
      "The visual system keeps financial information readable with restrained contrast and no decorative noise.",
  },
] as const;

export const integrationRows = [
  {
    name: "Messaging",
    description: "Email, SMS, and chat requests normalize into the intake queue.",
  },
  {
    name: "Payments",
    description: "Card, wallet, bank, and manual transfer states share one timeline.",
  },
  {
    name: "Operations",
    description: "CRM, fulfillment, and accounting tools receive clean handoff events.",
  },
] as const;

export const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    cadence: "per month",
    description: "For teams proving a better payment request workflow.",
    features: ["2 seats", "100 workflow runs", "Hosted payment links", "Email support"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$149",
    cadence: "per month",
    description: "For teams with recurring approvals and payment handoffs.",
    features: ["10 seats", "1,000 workflow runs", "Verification states", "Priority support"],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "annual",
    description: "For larger teams that need controls, reporting, and custom storage.",
    features: ["Unlimited seats", "Custom workflow volume", "Audit exports", "Implementation support"],
    featured: false,
  },
] as const;

export const aboutValues = [
  {
    title: "Less visual noise",
    description:
      "The product should make financial decisions feel calmer, not more theatrical.",
  },
  {
    title: "State before spectacle",
    description:
      "Motion is used to explain where work is moving, never to compete with the action.",
  },
  {
    title: "Readable handoffs",
    description:
      "Every team member should understand what happened and what needs to happen next.",
  },
] as const;

export const faqItems = [
  {
    question: "Is this connected to a real database?",
    answer:
      "Not yet. The trial API validates a database-ready payload and isolates persistence behind an adapter for the next production step.",
  },
  {
    question: "Why rebuild the animation?",
    answer:
      "The original animation had heavy glow, hard-coded offsets, and too many active elements. The React version uses responsive layout and calmer state changes.",
  },
  {
    question: "Can this become a full SaaS app?",
    answer:
      "Yes. The site is organized with App Router pages, reusable components, and an API boundary that can later connect to auth, payments, and storage.",
  },
] as const;

export const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Platform" },
      { href: "/workflow", label: "Workflow" },
      { href: "/security", label: "Security" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/start", label: "Start free trial" },
    ],
  },
] as const;
