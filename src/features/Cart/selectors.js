import { createSelector } from '@reduxjs/toolkit'

const cartItemsSelector = (state) => state.cart.cartItems

// count number of product in cart
export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
)

// calculate total of cart
export const cartItemsTotalSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
)

export const cartItemsTotalPromotionSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce(
    (total, item) => total + (item.product.originalPrice - item.product.salePrice) * item.quantity,
    0
  )
)

export const cartItemsTotalOriginalSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.originalPrice * item.quantity, 0)
)
