"use server";

import axios from "axios";
import { unstable_cache } from "next/cache";

const headers = {
  "Shop-Key": `${process.env.MERCHANT_API_KEY}`,
};

export const getProducts = unstable_cache(
  async () => {
    try {
      const req = await axios.get(
        "https://easydonate.ru/api/v3/shop/products",
        {
          headers: headers,
        },
      );

      if (req.status === 200) {
        return {
          success: true,
          products: req.data.response,
        };
      }

      return {
        success: false,
        error: `HTTP ${req.status}`,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          error: err.message,
        };
      }
    }
  },
  ["products-cache-key"],
  {
    revalidate: 60 * 10,
    tags: ["products"],
  },
);
