"use server";

import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createPlategaPayment({
  amount,
  productId,
}: {
  amount: number;
  productId: string;
}) {
  const orderId = uuidv4();

  const res = await fetch("https://app.platega.io/transaction/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MerchantId": process.env.PLATEGA_MERCHANT_ID!,
      "X-Secret": process.env.PLATEGA_SECRET!,
    },
    body: JSON.stringify({
      paymentMethod: 2,
      paymentDetails: {
        amount,
        currency: "RUB",
      },
      description: `Оплата заказа #${orderId}`,
      payload: JSON.stringify({ orderId, productId }),
      return: "https://pandoramc.ru/success",
      failedUrl: "https://pandoramc.ru/fail",
    }),
  });

  if (!res.ok) {
    throw new Error(`Platega error: ${res.status}`);
  }

  const data = await res.json();
  redirect(data.redirect);
}
