import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true
    },

    hideMiniCart(state) {
      state.showMiniCart = false
    },

    addToCart(state, action) {
      // newItem = {id, product, quantity}
      const newItem = action.payload
      const index = state.cartItems.findIndex((x) => x.id === newItem.id)

      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity
      } else {
        state.cartItems.push(newItem)
      }
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload
      const index = state.cartItems.findIndex((x) => x.id === id)

      if (index >= 0) {
        state.cartItems[index].quantity = quantity
      }
    },

    increaseQuantity(state, action) {
      const { id, quantity } = action.payload
      const index = state.cartItems.findIndex((x) => x.id === id)

      if (index >= 0) {
        state.cartItems[index].quantity = quantity + 1
      }
    },

    decreaseQuantity(state, action) {
      const { id, quantity } = action.payload
      const index = state.cartItems.findIndex((x) => x.id === id)

      if (index >= 0) {
        state.cartItems[index].quantity = quantity - 1
      }
    },

    removeFromCart(state, action) {
      const idNeedToRemove = action.payload

      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove)
    },

    removeAllCartItems(state) {
      state.cartItems = []
    },
  },
})

const { actions, reducer } = cartSlice
export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  setQuantity,
  removeFromCart,
  removeAllCartItems,
  decreaseQuantity,
  increaseQuantity,
} = actions
export default reducer
