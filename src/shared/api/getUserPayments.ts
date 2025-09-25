'use server';

import { payments } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const getUserPayments = async (player: string) => {
    try {
        const userPayments = await db
            .select()
            .from(payments)
            .where(eq(payments.player, player));

        return {
            success: true,
            error: null,
            payments: userPayments,
        };
    } catch (err) {
        return {
            success: false,
            error: `${err}`,
            payments: null
        }
    }
}
