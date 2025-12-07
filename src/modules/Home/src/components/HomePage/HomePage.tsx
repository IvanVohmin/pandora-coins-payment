"use client";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomePageProps, IProduct } from "@/shared/types/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createPayment } from "@/shared/api/createPayment";
import { useRouter } from "next/navigation";
import { getUserPayments } from "@/shared/api/getUserPayments";
import Image from "next/image";

const HomePage = ({ products }: HomePageProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userNick, setUserName] = useState<string>("");
  const [itemChoosed, setItemChoosed] = useState<{
    item: IProduct | null;
    show: boolean;
  }>({
    item: null,
    show: false,
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = async (itemId: number) => {
    if (itemId === 0) return;
    if (userNick.trim() === "") return toast.error("Заполните поле с ником!");

    const userPayments = await getUserPayments(userNick.trim());

    if (!userPayments.success) return toast.error(userPayments.error);

    if (userPayments.payments?.length) {
      // у игрока уже есть не оплаченные товары!
      toast.error(
        "У вас есть не оплаченные товары. Оплатите или отмените их, чтобы купить что то новое."
      );
      return router.push(`/payment/${userNick.trim()}`);
    }

    const paymentCreateRequest = await createPayment({
      player: userNick.trim(),
      item: itemId,
    });

    if (!paymentCreateRequest.success) {
      return toast.error(paymentCreateRequest.error);
    }

    toast.success(`Успешно!`);
    router.push(`/order/${paymentCreateRequest.payment}`);
  };

  return (
    <>
      <div className="w-full my-5">
        <Input
          placeholder="Поиск по товарам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!filteredProducts.length && (
          <span className="text-sm text-muted-foreground">
            Ничего не найдено
          </span>
        )}
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
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
              <span className="text-xs text-muted-foreground">
                ID: {product.id}
              </span>
              <Button
                onClick={() => setItemChoosed({ show: true, item: product })}
                className="bg-primary hover:bg-primary/90"
              >
                Выбрать
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog
        open={itemChoosed.show}
        onOpenChange={() => setItemChoosed({ show: false, item: null })}
      >
        <DialogContent className="w-full sm:w-[365px]">
          <DialogHeader>
            <DialogTitle>{itemChoosed.item?.name}</DialogTitle>
            <DialogDescription>
              Укажите свой ник, чтобы продолжить:
            </DialogDescription>
          </DialogHeader>
          <div className="my-3">
            <Input
              value={userNick}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ник на сервере"
            />
          </div>
          <Button
            onClick={() => handleBuy(itemChoosed.item?.id || 0)}
            variant={"secondary"}
          >
            Купить за {itemChoosed.item?.price} ©
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HomePage;
