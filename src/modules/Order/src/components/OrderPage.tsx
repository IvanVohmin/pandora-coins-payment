'use client';

import { IOrderPageParamsProps } from "@/shared/types/types"
import { Check } from "lucide-react"
import { toast } from "sonner";

const OrderPage = ({ orderId }: IOrderPageParamsProps) => {

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(`/payment ${orderId}`);
            toast.success('Команда скопирована!');
        } catch (err) {
            toast.error('Не удалось скопировать');
            console.error(err);
        }
    };

    return (
        <>
            <main className="w-full h-[79vh] flex items-center justify-center flex-col">
                <div className="flex items-center bg-green-600 rounded p-2 mb-4">
                    <Check color="#eee" />
                </div>

                <h1 className="text-center text-2xl tracking-tight">Зайдите на сервер и введите эту команду:</h1>
                <div onClick={copyCode} className="my-4 font-mono bg-secondary py-3 px-5 cursor-pointer hover:brightness-95 border rounded">
                    <span className="opacity-90">
                        /payment {orderId}
                    </span>
                </div>
            </main>
        </>
    )
}

export default OrderPage