import { FC } from "react";

interface IDiscountCard {
  oldPrice: number;
  currentPrice: number;
}

const DiscountCard: FC<IDiscountCard> = ({ oldPrice, currentPrice }) => {
  if (!oldPrice || oldPrice <= currentPrice) return null;

  const discount = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);

  return (
    <div
      className="
      relative overflow-hidden select-none font-bold
      bg-gradient-to-r from-red-600 to-rose-500
      rounded-full px-2.5 py-1 text-[#fafafa] text-xs
      min-w-[44px] w-auto text-center
      shadow-lg shadow-red-500/20
    "
    >
      <div
        className="
        absolute top-0 bottom-0 w-8
        bg-gradient-to-r from-transparent via-white/60 to-transparent
        animate-game-shimmer
      "
      />
      <span className="relative z-10">-{discount}%</span>
    </div>
  );
};

export default DiscountCard;
