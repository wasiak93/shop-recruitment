<script setup lang="ts">
import { defineEmits, computed } from 'vue'
import BaseContainer from '@/components/BaseContainer.vue'
import { useCartStore } from '@/stores/cart'
import { useMediaQuery } from '@vueuse/core'
import CancelIcon from '@/assets/icons/cancel.svg'

interface Props {
  isOpen: boolean
  offset: number
}

const props = defineProps<Props>()

interface CartEmits {
  'update:isOpen': [value: boolean]
}

type CloseHandler = () => void
type CartStyleComputed = { left: string }

const emit = defineEmits<CartEmits>()

const cartStore = useCartStore()
const isMobile = useMediaQuery('(max-width: 767px)')

const close: CloseHandler = () => {
  emit('update:isOpen', false)
}

type RemoveItemHandler = (cartId: number) => void

const cartStyle = computed(
  (): CartStyleComputed => ({
    left: `${props.offset}px`,
  }),
)

const handleRemoveItem: RemoveItemHandler = (cartId) => {
  cartStore.removeItem(cartId)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen">
      <div class="cart-overlay" @click="close" />
      <div class="cart" :style="isMobile ? {} : cartStyle">
        <div class="cart__header">
          <h2 class="cart__title">Twój koszyk</h2>
          <button class="cart__close" @click="close">
            <img :src="CancelIcon" alt="Zamknij" class="cart__close-icon" />
          </button>
        </div>
        <BaseContainer class="cart__container">
          <div class="cart__content">
            <div v-if="cartStore.itemCount" class="cart__items">
              <div v-for="item in cartStore.items" :key="item.cartId" class="cart__item">
                <div class="cart__item-top">
                  <img :src="item.coverImage" :alt="item.title" class="cart__item-image" />
                  <h3 class="cart__item-title">{{ item.title }}</h3>
                  <button class="cart__item-remove" @click="handleRemoveItem(item.cartId!)">
                    <img src="@/assets/icons/trash.svg" alt="Usuń" />
                  </button>
                </div>
                <div class="cart__item-bottom">
                  <span class="cart__item-label">Cena</span>
                  <span class="cart__item-price">{{ item.priceNet.toFixed(2) }} PLN</span>
                </div>
              </div>
            </div>
            <div v-else class="cart__empty">Twój koszyk jest pusty</div>
          </div>
        </BaseContainer>
        <div v-if="cartStore.itemCount" class="cart__summary">
          <div class="cart__summary-row">
            <div class="cart__summary-col">
              <span class="cart__summary-label">Łączna kwota</span>
            </div>
            <div class="cart__summary-col">
              <span class="cart__summary-price">{{ cartStore.totalPrice.toFixed(2) }} PLN</span>
              <div class="cart__summary-vat">+ VAT 23%</div>
            </div>
          </div>
          <button class="cart__checkout">PRZEJDŹ DO KOSZYKA</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}

.cart {
  position: absolute;
  top: 90px;
  width: 100%;
  max-width: 360px;
  background: $white-text;
  animation: slideIn 0.3s ease-out;
  z-index: 1001;
  right: 0;

  @media (min-width: $breakpoint-md) {
    max-width: 380px;
    right: auto;
  }

  &__header {
    padding: 0 0 calc($spacer * 4) calc($spacer * 4);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: $text-dark;
    margin-top: calc($spacer * 4);
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 41px;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $primary;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }

    &-icon {
      width: 15px;
      height: 15px;
    }
  }

  &__container {
    padding-top: 0;
  }

  &__content {
    padding: 0;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: calc($spacer * 2);
    max-height: 400px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: $primary;
      border-radius: 3px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: calc($spacer * 2);
    padding: calc($spacer * 2) 0;
    background: $background-light;

    &-top {
      display: flex;
      align-items: center;
      gap: calc($spacer * 4);
      padding: 0 calc($spacer * 2);
    }

    &-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: calc($spacer * 2);
      padding-top: calc($spacer * 2);
      padding: calc($spacer * 2) calc($spacer * 2) calc($spacer * 2) calc($spacer * 4);
      border-top: 1px solid $border-light;
    }

    &-image {
      width: 52px;
      height: 52px;
      object-fit: contain;
      border-radius: 50%;
      background: $light-text;
    }

    &-title {
      flex: 1;
      font-size: 16px;
      line-height: 24px;
      color: $primary;
    }

    &-label {
      color: $text-secondary;
      font-size: 14px;
    }

    &-price {
      color: $text-primary;
      font-size: 18px;
      font-weight: 900;
    }

    &-remove {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }
  }

  &__summary {
    position: sticky;
    bottom: 0;
    background: $white-text;
    padding: calc($spacer * 6) calc($spacer * 4);
    border-top: 1px solid #e5e5e5;
    margin-top: calc($spacer * 4);

    &-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: calc($spacer * 4);
      min-height: 44px;
    }

    &-col {
      display: flex;
      flex-direction: column;

      &:first-child {
        flex: 1;
        justify-content: center;
      }

      &:last-child {
        align-items: flex-end;
      }
    }

    &-label {
      font-size: 16px;
      color: $text-primary;
      font-weight: 700;
      display: flex;
      align-items: center;
      height: 100%;
    }

    &-price {
      font-size: 22px;
      font-weight: 900;
      color: $text-primary;
      margin-bottom: calc($spacer * 1);
    }

    &-vat {
      font-size: 14px;
      color: $text-primary;
      font-weight: 300;
    }
  }

  &__checkout {
    width: 100%;
    padding: calc($spacer * 3);
    background: #d1b352;
    color: $white-text;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 2.4px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  &__empty {
    text-align: center;
    color: $text-secondary;
    padding: calc($spacer * 8) 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
