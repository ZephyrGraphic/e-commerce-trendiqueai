import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/mockData";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className={cn(
        "flex flex-col items-center justify-center p-6 bg-white border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group",
        className
      )}
    >
      <div className="w-16 h-16 flex items-center justify-center text-4xl mb-3 group-hover:scale-110 transition-transform">
        {category.icon}
      </div>
      <span className="font-noto text-sm text-foreground font-medium">
        {category.name}
      </span>
    </Link>
  );
}
