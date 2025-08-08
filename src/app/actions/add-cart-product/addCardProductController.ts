
import { eq } from "drizzle-orm"

import { db } from "@/db"
import { cartItemTable, cartTable } from "@/db/schema"

export const findProductByVariant = async (variantId: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => 
      eq(productVariant.id, variantId)
  })

  if (!productVariant) {
    throw new Error("Product variant not found")
  }
  return productVariant
}

export const findCart = async (userId: string) => {
  const cart = await db.query.cartTable.findFirst({
    where: (cart, {eq}) => eq(cart.userId, userId)
  })

  return cart
}

export const createCart = async (userId: string) => {
  const [cart] = await db.insert(cartTable).values({
    userId,
  }).returning()

  return cart
}

export const alreadyExistProductInCart = async (cartId: string, productVariantId: string) => {
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, {eq}) => 
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, productVariantId)
  })

  return cartItem
}

export const updateItemQuantity = async (
  cartItemQuantity: number,
  quantity: number,
  cartItemId: string
) => {
  await db.update(cartItemTable)
    .set({
      quantity: cartItemQuantity + quantity,
    }).where(eq(cartItemTable.id, cartItemId))
}

export const insertItemInCart = async (cartId: string, productVariantId: string, quantity: number) => {
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId,
    quantity
  })
}


