import { OrderPage } from "@/modules/Order"
import { IOrderPageProps } from "@/shared/types/types";
import { notFound } from "next/navigation";


const Page = async({ params }: IOrderPageProps) => {
    const { orderId } = await params;
    
    if (!orderId) notFound()

    return (
        <OrderPage orderId={orderId} />
    )
}

export default Page
