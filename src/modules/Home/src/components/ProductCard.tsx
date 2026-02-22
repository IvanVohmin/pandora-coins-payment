import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/shared/types/types";
import Image from "next/image";
import { FC } from "react";

interface IProductCard {
  product: IProduct;
  setItemChoosed: (args: { show: boolean; item: IProduct }) => void;
}

const ProductCard: FC<IProductCard> = ({ product, setItemChoosed }) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {product.image && (
        <div className="w-full h-48 overflow-hidden">
          <Image
            height={100}
            width={100}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        {product.description && (
          <CardDescription className="line-clamp-2 h-10">
            {product.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
            {product.price.toLocaleString()} коинов
          </span>
          {product.old_price && (
            <span className="text-sm text-muted-foreground line-through">
              {product.old_price} ₽
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">ID: {product.id}</span>
        <Button
          onClick={() => setItemChoosed({ show: true, item: product })}
          className="bg-primary hover:bg-primary/90"
        >
          Выбрать
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
