<script setup lang="ts">
import ArrowRight from '@/assets/icons/arrow-right.svg'

interface Props {
  currentPage: PageNumber
  totalPages: PageNumber
}

interface Emits {
  (e: 'update:currentPage', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

type ButtonClickHandler = (event: MouseEvent) => void
type PageNumber = number
type PageClickHandler = (page: PageNumber) => void

const changePage: PageClickHandler = (page) => {
  emit('update:currentPage', page)
}

const handlePrevClick: ButtonClickHandler = () => {
  changePage(props.currentPage - 1)
}

const handleNextClick: ButtonClickHandler = () => {
  changePage(props.currentPage + 1)
}
</script>

<template>
  <div class="pagination">
    <div class="pagination__button-wrapper">
      <button v-if="currentPage !== 1" class="pagination__button" @click="handlePrevClick">
        <img
          :src="ArrowRight"
          alt="Poprzednia strona"
          class="pagination__button-icon pagination__button-icon--left"
        />
      </button>
    </div>
    <div class="pagination__pages">
      <button
        v-for="page in totalPages"
        :key="page"
        class="pagination__page"
        :class="{ 'pagination__page--active': page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
    <div class="pagination__button-wrapper">
      <button v-if="currentPage !== totalPages" class="pagination__button" @click="handleNextClick">
        <img :src="ArrowRight" alt="Następna strona" class="pagination__button-icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc($spacer * 2);
  margin-top: calc($spacer * 8);

  &__button-wrapper {
    width: 33px;
    height: 33px;
  }

  &__button {
    width: 33px;
    height: 33px;
    border: none;
    background: transparent;
    color: $text-secondary;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      color: $primary;
    }
  }

  &__button-icon {
    width: 5px;
    height: 9px;

    &--left {
      transform: rotate(180deg);
    }
  }

  &__pages {
    display: flex;
    gap: calc($spacer * 2);
  }

  &__page {
    width: 33px;
    height: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: $text-secondary;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 12px;
    font-weight: 300;

    &:hover {
      background: $primary;
      color: $white-text;
      font-size: 14px;
      font-weight: 700;
    }

    &--active {
      background: $primary;
      color: $white-text;
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
