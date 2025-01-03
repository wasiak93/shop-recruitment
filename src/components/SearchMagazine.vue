<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseContainer from '@/components/BaseContainer.vue'
import BasePagination from '@/components/BasePagination.vue'
import { getMagazines } from '@/api/magazines'
import type { Magazine } from '@/types/magazine'
import { useCartStore } from '@/stores/cart'

type ItemsPerPage = number
type CurrentPage = number

const magazines = ref<Magazine[]>([])
const isLoading = ref(true)
const currentPage = ref<CurrentPage>(1)
const itemsPerPage: ItemsPerPage = 8

const cartStore = useCartStore()

const paginatedMagazines = computed((): Magazine[] => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return magazines.value.slice(start, end)
})

type TotalPagesComputed = number

const totalPages = computed(
  (): TotalPagesComputed => Math.ceil(magazines.value.length / itemsPerPage),
)

type LoadMagazines = () => Promise<void>

const loadMagazines: LoadMagazines = async () => {
  try {
    magazines.value = await getMagazines()
  } catch (error: unknown) {
    console.error('Error loading magazines:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadMagazines)
</script>

<template>
  <div class="search-magazine">
    <BaseContainer>
      <h2 class="search-magazine__title">Wyszukaj czasopismo</h2>
      <div v-if="isLoading" class="search-magazine__loading">Ładowanie...</div>
      <div v-else>
        <div class="search-magazine__grid">
          <div
            v-for="magazine in paginatedMagazines"
            :key="magazine.id"
            class="search-magazine__item"
            @click="cartStore.addItem(magazine)"
          >
            <img :src="magazine.coverImage" :alt="magazine.title" class="search-magazine__cover" />
            <div class="search-magazine__item-text-wrapper">
              <h3 class="search-magazine__item-title">{{ magazine.title }}</h3>
              <div class="search-magazine__price">
                <span class="search-magazine__price-net"
                  >{{ magazine.priceNet.toFixed(2) }} PLN</span
                >
                <span class="search-magazine__price-gross">+ VAT {{ magazine.tax }}%</span>
              </div>
            </div>
          </div>
        </div>
        <BasePagination v-model:currentPage="currentPage" :total-pages="totalPages" />
      </div>
    </BaseContainer>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.search-magazine {
  margin: calc($spacer * 6) 0;
  @media (min-width: $breakpoint-lg) {
    margin: 0;
  }

  &__title {
    color: $primary;
    font-size: 28px;
    font-weight: 900;
    line-height: 34px;
    margin-bottom: calc($spacer * 16);

    @media (min-width: $breakpoint-lg) {
      font-size: 42px;
      line-height: 50px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: calc($spacer * 6);
    margin-bottom: calc($spacer * 8);

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    position: relative;
    height: 323px;

    &:hover {
      .search-magazine__item-text-wrapper {
        box-shadow: 20px 20px 40px $shadow-color;
      }

      .search-magazine__item-title,
      .search-magazine__price-net {
        color: $gold;
      }
    }
  }

  &__cover {
    max-width: 100%;
    height: 193px;
    margin-bottom: calc($spacer * 4);
    object-fit: contain;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  &__item-title {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: calc($spacer * 2);
    color: $primary;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    line-height: 20px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: calc($spacer * 0.5);
  }

  &__price-net {
    color: $primary;
    font-weight: 500;
    font-size: 18px;
  }

  &__price-gross {
    font-size: 14px;
    color: #999999;
  }

  &__loading {
    text-align: center;
    padding: calc($spacer * 8) 0;
    color: $primary;
  }

  &__item-text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    transition: all 0.2s ease;
    padding: calc($spacer * 4);
    width: 90%;
    height: 233px;
    position: absolute;
    top: 90px;
    padding-top: 120px;
  }
}
</style>
