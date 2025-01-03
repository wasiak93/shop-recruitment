<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import SearchMagazine from '@/components/SearchMagazine.vue'
import { useMediaQuery } from '@vueuse/core'

const isDesktop = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <div class="home">
    <PageHeader>
      <img v-if="isDesktop" src="@/assets/images/sign1.png" alt="Sign" class="home__sign" />
      <template #left>
        <h1 class="home__title">Czasopisma</h1>
        <div class="home__content">
          <p class="home__text home__text--bold">
            Mamy przyjemność oddać w Państwa ręce kolejny numer „Kazusu Podatkowego", który tym
            razem poświęcony jest w dużej części zmianom w podatkach w roku 2019.
          </p>
          <p class="home__text">
            Omówiliśmy najważniejsze zagadnienia takie jak zmiany w zakresie rozliczania kosztów
            używania samochodów osobowych, wprowadzenie „exit tax" czy zmiany dotyczące poboru
            podatku u źródła na gruncie podatków dochodowych, poświęcając im odrębne artykuły.
          </p>
        </div>
      </template>
      <template #right>
        <div class="home__cover-wrapper">
          <img src="@/assets/images/cover1.png" alt="Okładka czasopisma" class="home__cover" />
        </div>
      </template>
    </PageHeader>
    <div class="home__search">
      <SearchMagazine />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.home {
  position: relative;

  &__sign {
    position: absolute;
    top: -75px;
    z-index: 1;
    left: 0;

    @media (min-width: 1208px) {
      left: calc(-230 * (100vw - 1208px) / (1438 - 1208) / 2);
    }

    @media (min-width: 1668px) {
      left: -230px;
    }
  }

  &__title {
    font-size: 38px;
    margin-bottom: 32px;
    margin-top: 32px;
    color: $white-text;

    @media (min-width: $breakpoint-md) {
      font-size: 56px;
      line-height: 60px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: ($spacer * 4);

    @media (min-width: $breakpoint-lg) {
      margin-bottom: calc($spacer * 6);
    }
  }

  &__text {
    font-size: 12px;
    line-height: 20px;
    color: $light-text;
    font-weight: 300;

    @media (min-width: $breakpoint-md) {
      font-size: 14px;
      line-height: 24px;
    }

    &--bold {
      font-weight: 700;
      color: $white-text;
    }
  }

  &__cover-wrapper {
    width: 100%;
    height: 100%;
    position: static;
    display: flex;
    justify-content: center;

    @media (min-width: $breakpoint-lg) {
      position: relative;
    }
  }

  &__cover {
    width: 100%;
    height: auto;
    position: static;
    max-width: $image-cover-width;
    @media (min-width: $breakpoint-lg) {
      position: absolute;
      top: $image-cover-top;
      width: $image-cover-width-desktop;
      height: $image-cover-height;
      max-width: $image-cover-width-desktop;
      left: 0;
    }
    @media (min-width: $breakpoint-xl) {
      left: 65px;
    }
  }

  &__search {
    @media (min-width: $breakpoint-lg) {
      margin-top: $home-view-search-magazine-margin;
    }
  }
}
</style>
