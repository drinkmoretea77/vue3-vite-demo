<template>
  <button class="btn-default" :disabled="disabled" :style="btnStyle">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    customWidth: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    btnStyle() {
      const result = this.customWidth ? `min-width: ${this.customWidth}px` : "";
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-default {
  background: $accent;
  border: none;
  border-radius: 80px;
  color: $base-font-color;
  appearance: none;
  outline: none;
  box-shadow: none;
  min-width: 100px;
  padding: 4px 15px;
  font-size: 16px;
  line-height: 26px;
  font-family: $base-font-family;
  cursor: pointer;

  &:hover,
  &:active {
    background: $accent2;
  }

  &:disabled {
    background: $disabled;
    color: $light2;
  }
}
</style>
