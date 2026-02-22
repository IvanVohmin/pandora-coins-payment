"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPaymentsPageProps } from "@/shared/types/types";
import { Clock, ShoppingBag, X, Copy, Info } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { removePayment } from "@/shared/api/removePayment";
import { useRouter } from "next/navigation";
import { getProductName } from "@/shared/api/getProductName";
import { useEffect, useState } from "react";
import { copyText } from "@/shared/utils/copyText";

const PaymentPage = ({ username, payments }: IPaymentsPageProps) => {
  const router = useRouter();
  const [productNames, setProductNames] = useState<Record<number, string>>({});

  const fetchNames = async () => {
    const names: Record<number, string> = {};
    for (const payment of payments.payments!) {
      const productNameRequest = await getProductName(payment.item);
      names[payment.id] = productNameRequest.success
        ? productNameRequest.productName
        : `Unknown`;
    }
    setProductNames(names);
  };

  useEffect(() => {
    if (!payments || !payments.success || !payments.payments) {
      return;
    }
    fetchNames();
  }, [payments]);

  const cancelPayment = async (id: number) => {
    if (window.confirm("Вы уверены что хотите отменить этот платёж?")) {
      const cancelRequest = await removePayment(id);
      if (!cancelRequest.success) {
        return toast.error(cancelRequest.error);
      }
      toast.success("Вы отменили платёж, можете делать новые покупки");
      router.push("/");
    }
  };

  if (!payments.success) {
    return (
      <main className="flex min-h-[79vh] w-full items-center justify-center px-4">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
            <X className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Произошла ошибка
          </h1>
          <p className="mt-2 text-gray-500">{payments.error}</p>
        </div>
      </main>
    );
  }

  if (!payments.payments?.length) {
    return (
      <main className="flex min-h-[79vh] w-full items-center justify-center px-4">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Нет неоплаченных платежей
          </h1>
          <p className="mt-2 text-gray-500">
            Вы можете приобрести товары в{" "}
            <Link
              href="/"
              className="font-medium text-primary underline hover:text-primary/80"
            >
              каталоге
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col items-center gap-6 p-4 pb-12">
      <div className="w-full max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold">Ваши неоплаченные платежи</h1>
        <p className="text-sm text-muted-foreground">
          Скопируйте команду и введите её на сервере для получения товара
        </p>

        {payments.payments.map((payment) => (
          <Card key={payment.id} className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Товар #{payment.id}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Info className="mr-1.5 h-3.5 w-3.5" />
                Название товара: {productNames[payment.id] || "Загрузка..."}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1.5 h-3.5 w-3.5" />
                Статус: Ожидает оплаты
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Введите на сервере:
                </p>
                <div className="relative mt-2 cursor-default">
                  <code className="block w-full opacity-90 rounded-md border bg-secondary px-4 py-3 font-mono text-sm">
                    /payment {payment.operationId}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => copyText(`/payment ${payment.operationId}`)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="my-3">
                <Button
                  onClick={() => cancelPayment(payment.id)}
                  className="bg-red-500 hover:bg-red-400"
                >
                  <X className="mr-1.5" /> Отменить платеж
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                ID операции: <span className="font-mono">{payment.id}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default PaymentPage;
