<template>
  <div class="container">
    <div class="container__inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.container {
  margin: 0 auto;
  width: 100%;
  min-height: 100%;
  max-width: $max-container-width;
  position: relative;
  display: flex;
  flex-direction: column;

  &__inner {
    margin: 0 ($spacer * 4);
    min-height: 100%;
    flex: 1;
  }
}
</style>
