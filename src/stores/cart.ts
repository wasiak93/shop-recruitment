import { defineStore } from 'pinia'
import type { Magazine } from '@/types/magazine'

interface CartState {
  items: Magazine[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),

  actions: {
    addItem(item: Magazine) {
      this.items.push({
        ...item,
        cartId: Date.now(),
      })
    },

    removeItem(itemId: number) {
      this.items = this.items.filter((item) => item.cartId !== itemId)
    },
  },

  getters: {
    totalPrice(): number {
      return this.items.reduce((sum, item) => sum + item.priceNet, 0)
    },

    totalPriceWithVat(): number {
      return this.items.reduce((sum, item) => sum + item.priceNet * (1 + item.tax / 100), 0)
    },

    itemCount(): number {
      return this.items.length
    },
  },
})
