<template>
  <span
    class="text-sm font-medium py-1 px-2 rounded align-middle m-2"
    :class="state ? 'text-green-500 bg-green-100' : 'bg-red-100 text-red-500'"
    >{{ name }}     
  </span>
</template>

<script>
export default {
  props: ["name", "state"],
};
</script>
