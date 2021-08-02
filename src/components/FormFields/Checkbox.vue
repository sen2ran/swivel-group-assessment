<template>
  <label
    class="select-none container block relative cursor-pointer text-xl pl-8"
    >{{ title }}
    <input
      class="absolute opacity-0 left-0 top-0 cursor-pointer"
      type="checkbox"
      checked="checked"
    />
    <span class="h-6 w-6 checkmark absolute top-0 left-0 bg-gray-400"></span>
  </label>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
.container:hover input ~ .checkmark {
  background-color: #a0aec0;
}

.container input:checked ~ .checkmark {
  background-color: #0078d4;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 9px;
  top: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
