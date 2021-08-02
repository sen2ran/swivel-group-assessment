<template>
  <!-- TODO -->
  <!-- <h1>Extra filter</h1>
  <div class="flex pb-6">
    <checkbox title="Active" />
    <checkbox title="Verified" />
    <checkbox title="Shared" />
    <checkbox title="Suspended" />
  </div> -->
  <div class="flex">
    <searchable-select
      class="flex-initial"
      placeholder="Select field"
      endPoint="getAllField"
      :paginated="false"
      v-model="selectedField"
      idKeyValue="id"
    >
      <template v-slot:default="slotProps">
        <b :id="slotProps.item.id">{{ slotProps.item.name }}</b>
      </template>
    </searchable-select>
    <searchable-select
      class="flex-initial"
      :placeholder="`Search by ${selectedField.name}`"
      endPoint="searchByField"
      :paginated="true"
      :searchBy="selectedField.id"
      :key="SearchComponentRerenderKey"
      idKeyValue="_id"
      v-model="selectedUser"
    >
      <template v-slot:default="slotProps">
        <div :id="`item-${slotProps.item._id}`" class="text-xs">
          Name :{{ slotProps.item.name }} <br />
          Phone :{{ slotProps.item.phone }} <br />
          Alias :{{ slotProps.item.alias }} <br />
          Email :{{ slotProps.item.email }} <br />
          Signature :{{ slotProps.item.signature }} <br />
        </div>
      </template>
    </searchable-select>
  </div>
  <template v-if="userDetail">
    <user-card :userDetail="userDetail" />
  </template>
  <template v-else>
    <div
      class="w-full max-w-md  mx-auto bg-white shadow-md rounded-md px-6 py-4 my-6"
    >
      <h1>No user Selected</h1>
    </div>
  </template>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs, watch } from "vue";
import SearchableSelect from "../components/FormFields/SearchableSelect.vue";
import UserCard from "../components/User/UserCard.vue";

// import Checkbox from "../components/FormFields/Checkbox.vue";
import { getDetailByUserId } from "../services/userService";

export default {
  name: "Home",
  components: {
    SearchableSelect,
    UserCard,
    // Checkbox,
  },
  setup() {
    /**
     * asset Data
     * [*] Default data represent at the beginning
     */
    const assetData = reactive({
      selectedField: { name: "Name", id: "name", endPoint: "SearchByField" },
      SearchComponentRerenderKey: Number(new Date()),
      selectedUser: {},
      userDetail: undefined,
    });

    watch(
      () => assetData.selectedField,
      () => {
        assetData.SearchComponentRerenderKey = Number(new Date());
      }
    );
    watch(
      () => assetData.selectedUser,
      (val) => {
        assetData.userDetail = undefined;
        getDetailByUserId(val._id).then((res) => {
          assetData.userDetail = res;
        });
      }
    );

    return {
      ...toRefs(assetData),
    };
  },
};
</script>
