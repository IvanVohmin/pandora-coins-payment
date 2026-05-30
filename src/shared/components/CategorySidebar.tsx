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
        "flex items-center gap-2.5 whitespace-nowrap transition-all duration-200 rounded-xl px-4 py-2.5 text-sm font-medium border",
        isActive
          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 scale-[1.02]"
          : "bg-card text-card-foreground border-border hover:border-primary/40 hover:bg-accent/60 hover:shadow-sm",
      )}
    >
      <Icon className={cn("size-4 shrink-0", isActive && "drop-shadow-sm")} />
      <span>{category.name}</span>
    </button>
  );
}