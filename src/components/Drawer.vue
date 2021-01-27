<template>
  <v-navigation-drawer
    v-model="toggleStatus"
    :width="480"
    absolute
    temporary
    right
  >
    <slot />
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    toggle: { type: Boolean },
  },
  computed: {
    toggleStatus: {
      get() {
        return this.toggle;
      },
      set(newValue) {
        if (!newValue) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>