<template>
  <v-navigation-drawer v-model="toggle" :width="480" absolute temporary right>
    <slot />
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["toggle"],
  props: {
    toggle: Boolean,
  },
  watch: {
    toggle: {
      immediate: true,
      handler: function (newValue) {
        if (!newValue) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>