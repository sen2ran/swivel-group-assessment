<template>
  <div class="bg-white shadow-lg rounded-lg m-4 w-auto">
    <div class="py-5 px-5">
      <span class="font-bold text-gray-800 text-lg">{{ ticket.subject }}</span>
      <div class="text-sm text-gray-600">
        {{ ticket.description }}
      </div>
      <div class="mt-4">
        <span
          class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer"
          v-for="(tag, index) in ticket.tags"
          :key="index"
          >{{ tag }}</span
        >
      </div>

      <!-- <div >
        <div class="text-sm text-gray-600 font-light">
          description
        </div>
        <div class="text-sf">
          {{ ticket.description }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["ticket"],
  setup(props) {
    console.log(props.ticket);
  },
};
</script>
