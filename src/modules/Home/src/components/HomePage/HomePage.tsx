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
import Spinner from "@/shared/utils/Spinner";
import ProductCard from "../ProductCard";

const HomePage = ({ products }: HomePageProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userNick, setUserName] = useState<string>("");
  const [buyLoading, setBuyLoading] = useState<boolean>(false);
  const [itemChoosed, setItemChoosed] = useState<{
    item: IProduct | null;
    show: boolean;
  }>({
    item: null,
    show: false,
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCloseModal = () => {
    setItemChoosed({ ...itemChoosed, show: false });
    setTimeout(() => {
      setItemChoosed({ show: false, item: null });
    }, 200);
  };

  const handleBuy = async (itemId: number) => {
    if (itemId === 0) return;
    if (userNick.trim() === "") return toast.error("Заполните поле с ником!");

    setBuyLoading(true);

    try {
      const userPayments = await getUserPayments(userNick.trim());

      if (!userPayments.success) {
        setBuyLoading(false);
        return toast.error(userPayments.error);
      }

      if (userPayments.payments?.length) {
        setBuyLoading(false);
        toast.error(
          "У вас есть не оплаченные товары. Оплатите или отмените их, чтобы купить что то новое.",
        );
        return router.push(`/payment/${userNick.trim()}`);
      }

      const paymentCreateRequest = await createPayment({
        player: userNick.trim(),
        item: itemId,
      });

      if (!paymentCreateRequest.success) {
        setBuyLoading(false);
        return toast.error(paymentCreateRequest.error);
      }

      toast.success(`Успешно!`);
      router.push(`/order/${paymentCreateRequest.payment}`);
    } catch (err) {
      toast.error(`Возникла непредвиденная ошибка: ${err}`);
    } finally {
      setBuyLoading(false);
    }
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
          <ProductCard
            key={product.id}
            product={product}
            setItemChoosed={() => setItemChoosed({ show: true, item: product })}
          />
        ))}
      </div>
      <Dialog open={itemChoosed.show} onOpenChange={handleCloseModal}>
        <DialogContent className="w-full sm:w-[370px]">
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
            disabled={buyLoading}
            onClick={() => handleBuy(itemChoosed.item?.id || 0)}
            variant={"secondary"}
          >
            {buyLoading ? (
              <Spinner size={16} />
            ) : (
              <>Купить за {itemChoosed.item?.price.toLocaleString()} ©</>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HomePage;
