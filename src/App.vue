<template>
  <div class="app">
    <TheNavigation
      v-model:is-menu-open="isMenuOpen"
      @cart-click="handleCartClick"
      @cart-offset-change="cartOffset = $event"
    />
    <div class="app__overlay" :class="{ 'app__overlay--visible': isMenuOpen }" />
    <div class="app__content" :class="{ 'menu-open': isMenuOpen }">
      <router-view />
    </div>
    <ShoppingCart v-model:isOpen="isCartOpen" :offset="cartOffset" />
  </div>
</template>

<script setup lang="ts">
import TheNavigation from '@/components/TheNavigation.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import ShoppingCart from './components/ShoppingCart.vue'

const isMenuOpen = ref(false)
const route = useRoute()
const isMobile = useMediaQuery('(max-width: 1023px)')
const isCartOpen = ref(false)
const cartOffset = ref(0)

type CartOffset = number
type CartClickHandler = (offset: CartOffset) => void

watch(
  () => route.name,
  () => {
    isMenuOpen.value = false
  },
  { immediate: true },
)

watch(isMobile, (isMobile) => {
  if (!isMobile && isMenuOpen.value) {
    isMenuOpen.value = false
  }
})

const handleCartClick: CartClickHandler = (offset) => {
  cartOffset.value = offset
  isCartOpen.value = !isCartOpen.value
}
</script>

<style lang="scss">
@use '@/assets/styles/main.scss' as *;
@use '@/assets/styles/variables' as *;

.app {
  position: relative;
  margin-bottom: calc($spacer * 10);

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #3e3e3e;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease 0.1s;
    z-index: 3;

    &--visible {
      opacity: 0.6;
      pointer-events: auto;
      transition: opacity 0.2s ease;
    }
  }

  &__content {
    position: relative;
  }
}
</style>
