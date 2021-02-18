<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
  const ToastManager = () => {
    let callbacks = [];

    const show = ({ timeout, text }) => {
      console.log("show", timeout, text);
      callbacks.forEach((callback) => {
        callback({ timeout, text });
      });
    };

    const getParams = (callback) => {
      callbacks.push(callback);
    };

    return {
      show,
      getParams,
    };
  };

  const Toaster = ToastManager();
  export default {
    data: () => {
      return {
        snackbar: false,
        timeout: 1000,
        text: "",
      };
    },
    mounted() {
      Toaster.getParams(({ timeout, text }) => {
        this.timeout = timeout;
        this.text = text;
        this.snackbar = true;
      });
    },
  };

  export { Toaster };
</script>
