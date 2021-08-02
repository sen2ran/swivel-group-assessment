<template>
  <div class="w-full  mx-auto bg-white shadow-md rounded-md px-6 py-4 my-6">
    <div class="sm:flex sm:justify-between">
      <div class="flex items-center">
        <img
          class="h-12 w-12 rounded-full"
          src="https://lh3.googleusercontent.com/a-/AOh14Gi0DgItGDTATTFV6lPiVrqtja6RZ_qrY91zg42o-g"
          alt=""
        />
        <div class="ml-2">
          <h3 class="text-lg text-gray-800 font-medium">
            {{ userDetail.user.name }}
          </h3>
          <span class="text-gray-600">{{ userDetail.user.email }}</span>
        </div>
      </div>
      <div class="mt-2 sm:mt-0">
        <ActiveTag :state="userDetail.user.active" name="Active" />
        <ActiveTag :state="userDetail.user.verified" name="Verified" />
        <ActiveTag :state="userDetail.user.shared" name="Shared" />
        <ActiveTag :state="userDetail.user.suspended" name="Suspended" />
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div>
        <h4 class="text-gray-600 text-sm">Alias</h4>
        <span class="mt-2 text-xl font-medium text-gray-800">{{
          userDetail.user.alias
        }}</span>
      </div>
      <div>
        <h4 class="text-gray-600 text-sm">Organization</h4>
        <span class="mt-2 text-xl font-medium text-gray-800">{{
          userDetail.organization.name
        }}</span>
      </div>
      <div>
        <h4 class="text-gray-600 text-sm">Tmezone</h4>
        <span class="mt-2 text-xl font-medium text-gray-800">{{
          userDetail.user.timezone
        }}</span>
      </div>
    </div>
    <div class="mt-3">
      <h4 class="text-gray-600 text-sm">Phone No</h4>
      <span class="mt-2 text-xl font-medium text-gray-800">{{
        userDetail.user.phone
      }}</span>
    </div>
    <div class="mt-3">
      <h4 class="text-gray-600 text-sm">Signature</h4>
      <span class="mt-2 text-xl font-medium text-gray-800">{{
        userDetail.user.signature
      }}</span>
    </div>

    <div class="mt-4">
      <h4 class="text-sm text-gray-600">
        {{ userDetail.user.tags.length }} user Tags
      </h4>
      <div class="flex items-center overflow-hidden mt-2">
        <span
          class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer"
          v-for="(tag, index) in userDetail.user.tags"
          :key="index"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div class="mt-4">
      <h4 class="text-sm text-gray-600">
        {{ userDetail.organization.tags.length }} Organization Tags
      </h4>
      <div class="flex items-center overflow-hidden mt-2">
        <span
          class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer"
          v-for="(tag, index) in userDetail.organization.tags"
          :key="index"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div class="mt-4">
      <h4 class="text-sm text-gray-600">
        {{ userDetail.user.tags.length }} Organization Domain
      </h4>
      <div class="flex items-center overflow-hidden mt-2">
        <span
          class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer"
          v-for="(tag, index) in userDetail.user.tags"
          :key="index"
          >{{ tag }}</span
        >
      </div>
    </div>

    <div class="mt-4">
      <h4 class="text-sm text-gray-600">
        Tickets
      </h4>
      <Ticket
        v-for="ticket in userDetail.tickets"
        :key="ticket._id"
        :ticket="ticket"
      />
    </div>
  </div>
</template>

<script>
import ActiveTag from "./ActiveTag.vue";
import Ticket from "./Ticket.vue";

export default {
  components: {
    ActiveTag,
    Ticket,
  },
  props: {
    userDetail: Object || undefined,
  },
};
</script>

<style></style>
