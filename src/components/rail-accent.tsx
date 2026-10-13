import { cn } from "@/lib/utils";

export function RailAccent({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-20 w-full text-[var(--accent)]", className)}
      viewBox="0 0 720 120"
    >
      <path
        d="M 8 74 C 92 18, 156 18, 236 72 S 388 126, 472 58 S 620 12, 712 62"
        fill="none"
        stroke="rgba(23,32,28,0.13)"
        strokeLinecap="round"
        strokeWidth="10"
      />
      <path
        className="rail-path-slow"
        d="M 8 74 C 92 18, 156 18, 236 72 S 388 126, 472 58 S 620 12, 712 62"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}
