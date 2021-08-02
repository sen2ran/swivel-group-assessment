<template>
  <div class="mt-0">
    <page-header />
    <section class="container max-w-6xl  mx-auto px-8 my-8 lg:min-h-screen">
      <slot></slot>
    </section>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from "../components/Common/PageHeader.vue";
import PageFooter from "../components/Common/PageFooter.vue";
export default {
  components: {
    PageHeader,
    PageFooter,
  },
};
</script>
