import { PaymentPage } from "@/modules/Payments";
import { getUserPayments } from "@/shared/api/getUserPayments";
import { IPaymentsPageParamsProps } from "@/shared/types/types";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";


const Page = async({ params }: IPaymentsPageParamsProps) => {
    const { username } = await params;
    
    if (!username) notFound()

    const userPayments = await getUserPayments(username)

    return (
        <PaymentPage username={username} payments={userPayments} />
    )
}

export default Page
