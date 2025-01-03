<template>
  <div class="page">
    <BaseContainer>
      <h1>{{ currentPage?.label }}</h1>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navigationConfig } from '@/config/navigation'
import BaseContainer from '../components/BaseContainer.vue'

const route = useRoute()
const currentPage = computed(() => navigationConfig.find((item) => item.name === route.name))
</script>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.page {
  padding: 40px 0;

  h1 {
    margin-bottom: 24px;
  }
}
</style>
