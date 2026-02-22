"use client";
import { IOrderPageParamsProps } from "@/shared/types/types";
import { copyText } from "@/shared/utils/copyText";
import { Check } from "lucide-react";

const OrderPage = ({ orderId }: IOrderPageParamsProps) => {
  return (
    <>
      <main className="w-full h-[79vh] flex items-center justify-center flex-col">
        <div className="flex items-center bg-green-600 rounded p-2 mb-4">
          <Check color="#eee" />
        </div>

        <h1 className="text-center text-2xl tracking-tight">
          Зайдите на сервер и введите эту команду:
        </h1>
        <div
          onClick={() => copyText(`/payment ${orderId}`)}
          className="my-4 font-mono bg-secondary py-3 px-5 cursor-pointer hover:brightness-95 border rounded"
        >
          <span className="opacity-90">/payment {orderId}</span>
        </div>
      </main>
    </>
  );
};

export default OrderPage;
