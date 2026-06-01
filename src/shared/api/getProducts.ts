"use server";

export const getProducts = async () => {
  try {
    const res = await fetch("https://easydonate.ru/api/v3/shop/products", {
      headers: { "Shop-Key": `${process.env.MERCHANT_API_KEY}` },
      next: { revalidate: 30, tags: ["products"] },
    });

    if (!res.ok) {
      return { success: false, error: `Возникла ошибка: HTTP ${res.status}` };
    }

    const data = await res.json();
    return { success: true, products: data.response };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Неизвестная ошибка",
    };
  }
};
