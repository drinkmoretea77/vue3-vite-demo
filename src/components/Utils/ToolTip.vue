<template>
  <div class="tooltip">
    <slot></slot>
    <span v-if="activated" class="tooltip__hint">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.tooltip {
  display: block;
  position: relative;
  max-width: 100%;
  
  &__hint {
    display: none;
    align-items: center;
    color: $light;
    background: $base-font-color;
    position: absolute;
    top: calc(100% + 21px);
    bottom: auto;
    left: 80px;
    right: auto;
    border-radius: 4px;
    height: 32px;
    width: max-content;
    z-index: 10;
    padding: 3px 16px;
  }

  &:hover &__hint {
    display: flex;
  }
}
</style>
