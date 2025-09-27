'use server';

import axios from "axios";

const headers = {
    'Shop-Key': `${process.env.MERCHANT_API_KEY}`
}

export const getProductName = async (id: number) => {
    try {
        const req = await axios.get(`https://easydonate.ru/api/v3/shop/product/${id}`, {
            headers: headers
        })
        if (req.status === 200) {
            return {
                success: true,
                productName: req.data.response.name
            }
        }

        return {
            success: false,
            error: `HTTP ${req.status}`
        }
    } catch (err) {
        return {
            success: false,
            error: `${err}`
        }
    }
}