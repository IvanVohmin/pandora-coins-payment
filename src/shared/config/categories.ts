import { LayoutGrid, Shield, Gift, Coins, ScrollText, Box, Gem, Ellipsis } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ICategory {
  id: string;
  name: string;
  categoryId: number | null;
  icon: LucideIcon;
}

export const CATEGORIES: ICategory[] = [
  {
    id: "all",
    name: "Все товары",
    categoryId: null,
    icon: LayoutGrid,
  },
  {
    id: "privileges",
    name: "Привилегии",
    categoryId: 92156,
    icon: Shield,
  },
  {
    id: "donate-cases",
    name: "Кейсы с донатом",
    categoryId: 92157,
    icon: Gift,
  },
  {
    id: "coin-cases",
    name: "Кейсы с монетками",
    categoryId: 92171,
    icon: Coins,
  },
  {
    id: "title-cases",
    name: "Кейсы с титулами",
    categoryId: 92172,
    icon: ScrollText,
  },
  {
    id: "containers",
    name: "Контейнеры",
    categoryId: 92173,
    icon: Box,
  },
  {
    id: "sapphires",
    name: "Сапфиры",
    categoryId: 92175,
    icon: Gem,
  },
  {
    id: "misc",
    name: "Разное",
    categoryId: 92176,
    icon: Ellipsis,
  },
];