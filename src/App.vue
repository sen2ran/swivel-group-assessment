<template>
  <default-layout>
    <router-view />
  </default-layout>
</template>

<script>
import DefaultLayout from "./layout/Default.vue";
export default {
  components: {
    DefaultLayout,
  },
  setup() {},
};
</script>
