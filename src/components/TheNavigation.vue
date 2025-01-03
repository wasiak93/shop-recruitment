<template>
  <header class="header">
    <BaseContainer>
      <div class="header__wrapper">
        <div class="header__left">
          <router-link to="/" class="header__logo">
            <img src="@/assets/images/logo.png" alt="Kazus" />
          </router-link>
        </div>

        <nav class="nav" :class="{ 'nav--open': isMenuOpen }">
          <router-link
            v-for="item in navigationConfig"
            :key="item.name"
            :to="{ name: item.name }"
            class="nav__link"
            :class="{ 'nav__link--active': $route.name === item.name }"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <div class="header__right">
          <div class="header__icons">
            <button class="header__icon header__icon--search" aria-label="Search">
              <img src="@/assets/icons/magnifier.svg" alt="Search" />
            </button>
            <button class="header__icon header__icon--user" aria-label="User account">
              <img src="@/assets/icons/user.svg" alt="User" />
            </button>
            <button
              class="header__icon header__icon--cart"
              aria-label="Cart"
              @click="emit('cart-click', cartOffset)"
              ref="cartButton"
            >
              <img src="@/assets/icons/cart.svg" alt="Cart" />
              <span class="header__cart-badge">
                {{ cartStore.itemCount }}
              </span>
            </button>
          </div>

          <button
            class="header__toggle"
            :class="{ 'header__toggle--open': isMenuOpen }"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>

<script setup lang="ts">
import { navigationConfig } from '@/config/navigation'
import BaseContainer from '@/components/BaseContainer.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

interface Props {
  isMenuOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isMenuOpen: false,
})

type CartButtonRef = HTMLButtonElement | null
type CartOffsetRef = number
type ResizeHandler = () => void

const cartButton = ref<CartButtonRef>(null)
const cartOffset = ref<CartOffsetRef>(0)

type CalculateOffset = () => void
type ToggleMenu = () => void

const calculateOffset: CalculateOffset = () => {
  if (cartButton.value) {
    const rect = cartButton.value.getBoundingClientRect()
    const cartWidth = window.innerWidth >= 768 ? 380 : 360
    cartOffset.value = rect.right - cartWidth
    emit('cart-offset-change', cartOffset.value)
  }
}

onMounted(() => {
  calculateOffset()
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

interface NavigationEmits {
  'update:isMenuOpen': [value: boolean]
  'cart-click': [offset: number]
  'cart-offset-change': [offset: number]
}

const emit = defineEmits<NavigationEmits>()

const toggleMenu: ToggleMenu = () => {
  emit('update:isMenuOpen', !props.isMenuOpen)
}

const handleResize: ResizeHandler = () => {
  calculateOffset()
}
</script>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.header {
  position: relative;
  top: -1px;
  left: 0;
  width: 100%;
  height: $header-height;
  padding: 27px 0 0;
  background: #ffffff;
  border: 1px solid #f1f5f5;
  display: flex;
  justify-content: center;
  z-index: 1001;

  .container--nav {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 ($spacer * 4);
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__left {
    display: flex;
    align-items: center;
    z-index: 11;
    height: auto;
    flex-shrink: 0;
  }

  &__logo {
    img {
      width: 108px;
      @media (min-width: $breakpoint-md) {
        width: 136px;
      }

      @media (min-width: $breakpoint-lg) {
        width: 168px;
      }
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 11;
    width: 30px;
    height: 30px;
    position: relative;

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: #000;
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
      position: absolute;
      left: 3px;

      &:first-child {
        top: 7px;
      }

      &:nth-child(2) {
        top: 14px;
      }

      &:last-child {
        top: 21px;
      }
    }

    &--open {
      span {
        &:first-child {
          transform: translateY(7px) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:last-child {
          transform: translateY(-7px) rotate(-45deg);
        }
      }
    }

    @media (min-width: $breakpoint-lg) {
      display: none;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: ($spacer * 3);
    z-index: 11;
    height: auto;
    flex-shrink: 0;
    @media (min-width: $breakpoint-lg) {
      padding-top: $spacer;
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    margin-right: ($spacer * 3);

    @media (min-width: $breakpoint-lg) {
      margin-right: 0;
    }
  }

  &__icon {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 13px;

    @media (min-width: $breakpoint-md) {
      width: 19px;
      height: 19px;
    }

    &--search {
      width: 27px;
      height: 27px;
      background: $primary;
      border-radius: 50%;
      margin-right: 13px;

      @media (min-width: $breakpoint-md) {
        width: 40px;
        height: 40px;
        margin-right: 19px;
      }

      img {
        filter: brightness(0) invert(1);
        width: 13px;
        height: 13px;

        @media (min-width: $breakpoint-md) {
          width: 19px;
          height: 19px;
        }
      }
    }

    &--user {
      width: 13px;
      height: 13px;
      margin-right: 20px;

      @media (min-width: $breakpoint-md) {
        width: 19px;
        height: 19px;
        margin-right: 29px;
      }

      img {
        width: 13px;
        height: 13px;

        @media (min-width: $breakpoint-md) {
          width: 19px;
          height: 19px;
        }
      }
    }

    &--cart {
      width: 14px;
      height: 14px;
      position: relative;

      @media (min-width: $breakpoint-md) {
        width: 20px;
        height: 20px;
      }

      img {
        width: 14px;
        height: 14px;

        @media (min-width: $breakpoint-md) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

.nav {
  display: flex;
  flex-direction: column;
  gap: ($spacer * 3);
  position: absolute;
  top: 62px;
  left: -1px;
  width: calc(100% + 2px);
  height: auto;
  background: #ffffff;
  padding: ($spacer * 6) 0;
  border-bottom: 1px solid #f1f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  align-items: center;
  z-index: 4;

  &.nav--open {
    transform: translateX(0);
    transition: transform 0.2s ease;
  }

  &:not(.nav--open) {
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  @media (min-width: $breakpoint-lg) {
    position: static;
    flex-direction: row;
    gap: ($spacer * 5);
    padding: 15px ($spacer * 14.6) 0 0;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
    transform: none;
    border: none;
    box-shadow: none;

    &.nav--open,
    &:not(.nav--open) {
      transform: none;
      transition: none;
    }
  }

  &__link {
    text-decoration: none;
    font-weight: 300;
    font-size: 14px;
    letter-spacing: 0px;
    color: #2e3838;

    &:hover,
    &--active {
      color: $primary;
    }
  }
}

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: $white-text;
  z-index: 1001;
  border-bottom: 1px solid #f1f5f5;
}

.header__cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: $primary;
  color: $white-text;
  border-radius: 50%;
  width: 13px;
  height: 13px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transform: translate(50%, -50%);

  @media (min-width: $breakpoint-md) {
    width: 13px;
    height: 13px;
    font-size: 10px;
  }
}
</style>
