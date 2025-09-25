'use server';

import { payments } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const removePayment = async (id: number) => {
    try {
        const existing = await db
            .select({ id: payments.id })
            .from(payments)
            .where(eq(payments.id, id))
            .limit(1);

        if (existing.length === 0) {
            return {
                success: false,
                error: 'Платёж с таким ID не найден',
            };
        }

        await db.delete(payments).where(eq(payments.id, id)).execute();
        return {
            success: true,
        };
    } catch (err) {
        return {
            success: false,
            error: 'Не удалось отменить платеж'
        }
    }
}