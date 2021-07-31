<template>
  <div class="home">
    <h1>ADD NEW USER</h1>
    <searchable-select />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchableSelect from "../components/SearchableSelect.vue";
import { getAllTimeZones, getAllTags } from "../assets/JsonStore";

export default {
  name: "Home",
  components: {
    SearchableSelect,
  },
  setup() {
    console.log(getAllTimeZones, getAllTags);
  },
};
</script>
