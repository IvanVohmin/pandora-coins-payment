import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const merchantId = req.headers.get('X-MerchantId')
  const secret = req.headers.get('X-Secret')

  if (
    merchantId !== process.env.PLATEGA_MERCHANT_ID ||
    secret !== process.env.PLATEGA_SECRET
  ) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const body = await req.json()
  const { status, transactionId, payload } = body

  let meta: { orderId: string; productId: string }
  try {
    meta = JSON.parse(payload)
  } catch {
    return new NextResponse('Invalid payload', { status: 400 })
  }

  const { orderId, productId } = meta

  if (status === 'CONFIRMED') {
    // TODO: пометить заказ оплаченным в БД
    // await db.order.create({ data: { orderId, productId, transactionId, status: 'paid' } })
    console.log(`✅ Оплачено: orderId=${orderId}, productId=${productId}, tx=${transactionId}`)
  } else if (status === 'CANCELED') {
    // TODO: пометить заказ отменённым
    console.log(`❌ Отменён: orderId=${orderId}`)
  } else if (status === 'CHARGEBACK') {
    // TODO: обработать возврат
    console.log(`↩️ Чарджбэк: orderId=${orderId}, tx=${transactionId}`)
  }

  return new NextResponse('OK', { status: 200 })
}