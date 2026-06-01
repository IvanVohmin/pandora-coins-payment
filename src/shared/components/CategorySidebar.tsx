"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES, ICategory } from "@/shared/config/categories";

interface CategorySidebarProps {
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function CategorySidebarMobile({
  activeCategory,
  onSelect,
}: CategorySidebarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none md:hidden">
      {CATEGORIES.map((cat) => (
        <CategoryButton
          key={cat.id}
          category={cat}
          isActive={activeCategory === cat.id}
          onClick={() => onSelect(cat.id)}
        />
      ))}
    </div>
  );
}

export function CategorySidebarDesktop({
  activeCategory,
  onSelect,
}: CategorySidebarProps) {
  return (
    <div className="hidden md:flex flex-col gap-2 w-52 shrink-0">
      {CATEGORIES.map((cat) => (
        <CategoryButton
          key={cat.id}
          category={cat}
          isActive={activeCategory === cat.id}
          onClick={() => onSelect(cat.id)}
        />
      ))}
    </div>
  );
}

function CategoryButton({
  category,
  isActive,
  onClick,
}: {
  category: ICategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = category.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 whitespace-nowrap transition-all duration-200 rounded-lg px-4 py-2.5 text-sm font-medium",
        isActive
          ? "bg-[#3E7B32] dark:bg-[#4a9e43] text-white shadow-sm shadow-[#3E7B32]/30 dark:shadow-[#4a9e43]/25"
          : "bg-card text-muted-foreground border border-border hover:border-[#52a346]/40 hover:bg-[#52a346]/10 hover:text-[#3E7B32] dark:hover:text-[#6BBF5E]",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span>{category.name}</span>
    </button>
  );
}