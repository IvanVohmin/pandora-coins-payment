'use server';

import { IPaymentData } from "@/shared/types/types";
import { db } from '@/lib/db';
import { payments } from '@/lib/db/schema';
import uuid4 from "uuid4";

export const createPayment = async(data: IPaymentData) => {
    try {
        
        const operation_id = uuid4()

        await db.insert(payments).values({
            player: data.player,
            item: data.item,
            operationId: operation_id
        })

        return {
            success: true,
            payment: operation_id
        }

    } catch (err) {
        return {
            success: false,
            error: `Возникла ошибка при создания платёжа в системе`
        }
    }
}