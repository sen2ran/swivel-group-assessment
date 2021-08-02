<template>
  <div class="dropdown z-1">
    <!-- @click="handleInput" -->
    <div class="dropdown-input px-6">
      <label class="px-7">{{ selectedValue }}</label>
      <input
        v-model.trim="inputValue"
        type="text"
        class="dropdown-input"
        ref="searchInputRef"
        :placeholder="placeholder"
        @focus="isShowList = true"
        @blur="showInput = false"
      />
      <!-- :autofocus="true" -->
      <!-- v-show="showInput" -->
    </div>

    <div v-show="isShowList" class="dropdown-list" @scroll="onScroll">
      <div
        v-for="item in itemList"
        @click="onSelect(item)"
        :key="item.name"
        class="dropdown-item"
        ref="searchableSelectRef"
      >
        <slot v-bind:item="item"></slot>
      </div>
      <div v-show="loading" class="dropdown-item">
        loading
      </div>
      <div v-show="isEndOfScroll">
        All details are here
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Generic Custom Select Dropdown
 * Will load 10 by 10 from dynamic endpoint, which will pass from parent component
 * So that, it can reusable
 * Add debounce for better serch expericance
 */
/**
 * TODO
 * have to hide the dropdown list when click out side
 *
 * I'm not good wit UI :)
 */
import { onMounted, reactive, toRefs, ref, watch } from "vue";
import debounce from "lodash/debounce";
import { getInfiniteRecords } from "../../services/userService";

export default {
  props: {
    placeholder: String,
    endPoint: String,
    paginated: Boolean,
    modelValue: Object,
    searchBy: String,
  },
  setup(props, { emit }) {
    /**
     * asset Data
     * [*] Default data represent at the beginning
     */
    const assetData = reactive({
      inputValue: "",
      selectedValue: "",
      itemList: [],
      isShowList: false,
      apiLoaded: false,
      pageCount: 0,
      currentPage: 0,
      loading: false,
      isEndOfScroll: false,
      showInput: true,
    });

    /**
     * Get Dom to access for size of div
     * Add foucs to the input
     */
    const searchableSelectRef = ref(null);
    const searchInputRef = ref(null);

    watch(
      () => assetData.inputValue,
      debounce((val) => {
        assetData.itemList = [];
        assetData.loading = true;
        assetData.isEndOfScroll = false;
        getPaginatedRecords(1, "fetch", props.searchBy, val);
      }, 500)
    );

    onMounted(() => {
      assetData.loading = true;
      getPaginatedRecords(1, "fetch", props.searchBy);
    });

    /**
     * Generic API method
     * can be user for fetch and loadmore
     */
    const getPaginatedRecords = (
      currentPage,
      method,
      searchBy,
      searchValue
    ) => {
      const options = {
        currentPage: method == "fetch" ? currentPage : currentPage + 1,
        searchBy: searchBy,
      };

      if (searchValue) {
        options.searchValue = searchValue;
      }
      getInfiniteRecords(props.endPoint, options).then((response) => {
        console.log(response.pageCount, response.currentPage);
        assetData.pageCount = response.pageCount;
        assetData.currentPage = response.currentPage;

        assetData.itemList =
          method == "fetch"
            ? response.records
            : [...assetData.itemList, ...response.records];

        assetData.loading = false;
      });
    };
    const itemVisible = (item) => {
      let currentName = item.name.toLowerCase();
      let currentInput = assetData.inputValue.toLowerCase();
      return currentName.includes(currentInput);
    };

    const onSelect = (item) => {
      assetData.isShowList = false;
      assetData.selectedValue = item.name;
      emit("update:modelValue", item);
    };

    const onScroll = () => {
      let lastElement = document.getElementById(
        assetData.itemList
          ? `item-${(assetData.itemList || []).length - 1}`
          : "null"
      );

      const containerTop = searchableSelectRef.value
        ? searchableSelectRef.value.getBoundingClientRect().top
        : null;

      const lastElementTopPos =
        lastElement?.getBoundingClientRect().top + 30 - containerTop;

      const containerHeight = searchableSelectRef.value.getBoundingClientRect()
        .height;

      if (
        lastElementTopPos < containerHeight &&
        assetData.pageCount > assetData.currentPage &&
        !assetData.apiLoaded
      ) {
        loadMore();
      } else {
        if (assetData.pageCount === assetData.currentPage) {
          assetData.isEndOfScroll = true;
        }
      }
    };

    const loadMore = () => {
      getPaginatedRecords(
        assetData.currentPage,
        "load",
        props.searchBy,
        assetData.inputValue
      );
    };

    const handleInput = () => {
      assetData.showInput = true;
      assetData.isShowList = true;
      console.log(searchInputRef);
      searchInputRef.value.focus();
    };

    /**
     * TODO => have to hide the dropdown list when click out side
     */
    // const onOutSide = () => {
    //   console.log("Sen2");
    // };

    return {
      ...toRefs(assetData),
      itemVisible,
      onSelect,
      onScroll,
      searchableSelectRef,
      searchInputRef,
      handleInput,
    };
  },
};
</script>

<style>
.dropdown {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}
.dropdown-input,
.dropdown-selected {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #edf2f7;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
}
.dropdown-input:focus,
.dropdown-selected:hover {
  background: #fff;
  border-color: #e2e8f0;
}
.dropdown-input::placeholder {
  opacity: 0.7;
}
.dropdown-selected {
  font-weight: bold;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  width: 100%;
  max-height: 300px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.dropdown-item {
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #edf2f7;
}
.dropdown-item-flag {
  max-width: 24px;
  max-height: 18px;
  margin: auto 12px auto 0px;
}
</style>
