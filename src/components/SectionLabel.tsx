import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-4 h-8 bg-primary rounded-sm" />
      <span className="text-primary font-fredoka text-sm font-medium">
        {label}
      </span>
    </div>
  );
}
