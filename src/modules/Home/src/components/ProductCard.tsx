import { Button } from "@/components/ui/button";
import { IProduct } from "@/shared/types/types";
import Image from "next/image";
import { FC } from "react";
import DiscountCard from "./DiscountCard";
import { Package, ShoppingCart } from "lucide-react";

interface IProductCard {
  product: IProduct;
  setItemChoosed: (args: { show: boolean; item: IProduct }) => void;
}

const ProductCard: FC<IProductCard> = ({ product, setItemChoosed }) => {
  return (
    <div
      onClick={() => setItemChoosed({ show: true, item: product })}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(62,123,50,0.2)] hover:border-[#52a346]/40"
    >
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-muted/50">
        {product.image ? (
          <Image
            fill
            src={product.image}
            alt={product.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="size-12 text-muted-foreground/25" />
          </div>
        )}

        {product.old_price && (
          <div className="absolute top-2.5 left-2.5 w-fit">
            <DiscountCard
              oldPrice={product.old_price}
              currentPrice={product.price}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#52a346] dark:group-hover:text-[#6BBF5E] transition-colors duration-200">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/60">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-bold leading-none">
              {product.price.toLocaleString()} ₽
            </span>
            {product.old_price && (
              <span className="text-xs text-muted-foreground line-through">
                {product.old_price.toLocaleString()} ₽
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="shrink-0 bg-[#3E7B32] hover:bg-[#52A346] text-white text-xs font-semibold gap-1.5 shadow-none border-none"
            onClick={(e) => {
              e.stopPropagation();
              setItemChoosed({ show: true, item: product });
            }}
          >
            <ShoppingCart className="size-3.5" />
            Купить
          </Button>
        </div>
      </div>

      {/* Minecraft green bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3E7B32] to-[#52A346] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

export default ProductCard;
