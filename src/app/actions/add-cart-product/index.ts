"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"

import { alreadyExistProductInCart, createCart, findCart, findProductByVariant, insertItemInCart, updateItemQuantity } from "./addCardProductController"
import { AddProductToCartSchema, addProductToCartSchema } from "./shema"

export const addProductToCart = async (data: AddProductToCartSchema) => {
  addProductToCartSchema.parse(data)
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error("User not authenticated")
  }
  const userId = session.user.id
  const productVariantId = data.productVariantId
  const quantity = data.quantity

  await findProductByVariant(productVariantId)

  const cart = await findCart(userId)

  let cartId = cart?.id

  if (!cartId) {
    const newCart = await createCart(userId)
    cartId = newCart.id
  }

  const cartItem = await alreadyExistProductInCart(cartId, productVariantId)

  if (cartItem) {
    await updateItemQuantity(cartItem.quantity, quantity, cartItem.id)
    return 
  }

  await insertItemInCart(cartId, productVariantId, quantity)
}