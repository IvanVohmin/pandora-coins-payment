"use server";

export const getProductName = async (id: number) => {
  try {
    const res = await fetch(`https://easydonate.ru/api/v3/shop/product/${id}`, {
      headers: { "Shop-Key": `${process.env.MERCHANT_API_KEY}` },
      next: { revalidate: 300, tags: ["products"] },
    });

    if (!res.ok) {
      return { success: false, error: `HTTP ${res.status}` };
    }

    const data = await res.json();
    return { success: true, productName: data.response.name as string };
  } catch (err) {
    return { success: false, error: `${err}` };
  }
};
