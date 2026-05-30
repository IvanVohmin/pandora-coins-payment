"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HomePageProps, IProduct } from "@/shared/types/types";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createPayment } from "@/shared/api/createPayment";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserPayments } from "@/shared/api/getUserPayments";
import Spinner from "@/shared/utils/Spinner";
import ProductCard from "../ProductCard";
import { CATEGORIES } from "@/shared/config/categories";
import {
  CategorySidebarMobile,
  CategorySidebarDesktop,
} from "@/shared/components/CategorySidebar";
import { Search } from "lucide-react";

type TPurchaseMethod = "coins" | "rub";

const HomePage = ({ products }: HomePageProps) => {
  const searchParams = useSearchParams();
  const productIdFromParams = searchParams.get("productId");

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userNick, setUserName] = useState<string>("");
  // Минимальное начальное значение теперь 10
  const [coinsAmount, setCoinsAmount] = useState<number>(10);
  const [buyLoading, setBuyLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [itemChoosed, setItemChoosed] = useState<{
    item: IProduct | null;
    show: boolean;
  }>({
    item: null,
    show: false,
  });

  useEffect(() => {
    if (!productIdFromParams) return;
    const productToShow = products.find(
      (product) => product.id === Number(productIdFromParams),
    );
    if (productToShow) {
      setItemChoosed({ show: true, item: productToShow });
    }
  }, []);

  // товар "Коины"
  const isItemCoins = itemChoosed.item && itemChoosed.item.id === 1017542;

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== "all") {
      const category = CATEGORIES.find((c) => c.id === activeCategory);
      if (category?.categoryId) {
        result = result.filter(
          (product) => product.category_id === category.categoryId,
        );
      }
    }

    if (searchTerm.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return result;
  }, [products, activeCategory, searchTerm]);

  const handleCloseModal = () => {
    if (buyLoading) return;
    setItemChoosed({ ...itemChoosed, show: false });
    setTimeout(() => {
      setItemChoosed({ show: false, item: null });
    }, 150);
  };

  const coinsBuy = async (itemId: number) => {
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

  const rublesBuy = async () => {
    if (!itemChoosed.item) return;
    try {
      console.log(itemChoosed.item.name);
    } catch (err) {
      toast.error(`Возникла непредвиденная ошибка: ${err}`);
    } finally {
      setBuyLoading(false);
    }
  };

  const renderPrice = () => {
    if (!itemChoosed.item) return 0;

    if (isItemCoins) {
      return coinsAmount.toLocaleString();
    }

    // для обычных товаров с нормальной ценой
    return itemChoosed.item.price.toLocaleString();
  };

  const handleBuy = (itemId: number, purchaseMethod: TPurchaseMethod) => {
    if (itemId === 0) return;
    if (userNick.trim() === "") return toast.error("Заполните поле с ником!");

    if (isItemCoins) {
      // Проверка на минимальное значение 10
      if (coinsAmount < 10 || coinsAmount > 9999) {
        return toast.error("Кол-во коинов должно быть от 10 до 9 999");
      }
    }

    setBuyLoading(true);

    if (purchaseMethod === "coins") {
      coinsBuy(itemId);
    } else if (purchaseMethod === "rub") {
      rublesBuy();
    }
  };

  return (
    <div className="flex flex-col gap-5 my-5" id="shop">
      <CategorySidebarMobile
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Поиск по товарам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-6">
        <CategorySidebarDesktop
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!filteredProducts.length && (
              <span className="text-sm text-muted-foreground col-span-full">
                Ничего не найдено
              </span>
            )}
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setItemChoosed={() =>
                  setItemChoosed({ show: true, item: product })
                }
              />
            ))}
          </div>
        </div>
      </div>

      {itemChoosed.item && (
        <Dialog open={itemChoosed.show} onOpenChange={handleCloseModal}>
          <DialogContent className="w-full sm:w-[480px]">
            <DialogHeader>
              <DialogTitle>{itemChoosed.item.name}</DialogTitle>
            </DialogHeader>
            <div className="w-full overflow-x-auto opacity-90">
              {itemChoosed.item.type === "group" ? (
                <pre>ⓘ {itemChoosed.item.description}</pre>
              ) : (
                <p>ⓘ {itemChoosed.item.description}</p>
              )}
            </div>
            <hr />
            <div className="mt-3 mb-1">
              <h4 className="mb-2 text-muted-foreground text-sm">
                Укажите свой ник, чтобы продолжить:
              </h4>
              <Input
                value={userNick}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ник на сервере"
                disabled={buyLoading}
              />
            </div>

            {isItemCoins && (
              <div className="mb-5 mt-2">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-muted-foreground text-sm">
                    Кол-во коинов для покупки:
                  </h4>
                  <span className="text-sm font-bold bg-secondary px-2 py-0.5 rounded">
                    {coinsAmount.toLocaleString()} ©
                  </span>
                </div>

                <input
                  type="range"
                  min={10} // Минимальное значение теперь 10
                  max={9999}
                  step={1}
                  value={coinsAmount}
                  disabled={buyLoading}
                  onChange={(e) => setCoinsAmount(Number(e.target.value))}
                  className="w-full h-2 bg-secondary dark:bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                  <span>10</span> {/* Заменили 1 на 10 */}
                  <span>5 000</span>
                  <span>9 999</span>
                </div>
              </div>
            )}

            <Button
              disabled={buyLoading}
              onClick={() => handleBuy(itemChoosed.item?.id || 0, "rub")}
            >
              {buyLoading ? (
                <Spinner size={18} />
              ) : (
                <>Купить за {renderPrice()} руб.</>
              )}
            </Button>
            {!isItemCoins && (
              <>
                <div className="w-full text-center opacity-80 font-bold">
                  или
                </div>

                <Button
                  disabled={buyLoading}
                  onClick={() => handleBuy(itemChoosed.item?.id || 0, "coins")}
                  className="bg-[#1a1a1a] dark:bg-[#fafafa] text-[#fafafa] dark:text-[#1a1a1a] hover:bg-[#232423] dark:hover:bg-[#eee]"
                >
                  {buyLoading ? (
                    <Spinner size={18} />
                  ) : (
                    <>Купить за {renderPrice()} ©</>
                  )}
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;