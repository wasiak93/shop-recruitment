<template>
  <div class="page-header">
    <BaseContainer>
      <slot />
      <div class="page-header__wrapper">
        <div class="page-header__grid">
          <div class="page-header__col">
            <slot name="left" />
          </div>
          <div class="page-header__col">
            <slot name="right" />
          </div>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import BaseContainer from '@/components/BaseContainer.vue'
</script>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.page-header {
  width: 100%;
  background-color: $primary;
  height: auto;
  position: relative;
  display: flex;

  @media (min-width: $breakpoint-lg) {
    min-height: 360px;
    padding: 0;
  }

  &__wrapper {
    min-height: 100%;
    display: flex;
  }

  &__grid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ($spacer * 4);
    margin: $page-header-grid-margin 0;

    @media (min-width: $breakpoint-lg) {
      flex-direction: row;
      gap: ($spacer * 4);
    }
  }

  &__col {
    flex: 1;

    &:first-child {
      @media (min-width: $breakpoint-lg) {
        max-width: 562px;
      }
    }
  }
}
</style>
