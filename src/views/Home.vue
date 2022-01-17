<template>
  <div class="home wrap-container">
    <header>
      <HeaderComponent :title="'Scheduling'" />
      <div class="section-title">
        <h2>Sites</h2>
      </div>
    </header>
    <section class="filters">
      <div class="filters__by-type">
        <select @change="handleChangeProperty($event)">
          <option>All Sites</option>
          <option
            v-for="(property, index) in PROPERTY_TYPES"
            :key="index + property"
          >
            {{ property }}
          </option>
        </select>
      </div>
      <div class="filters__search">
        <form @submit.prevent="handleSearch()" class="search-box">
          <input type="text" placeholder="Search..." v-model="searchQuery" />
          <font-awesome-icon icon="search" />
        </form>
      </div>
    </section>
    <section class="sites-list" ref="scrollComponent">
      <div
        class="sites-anchor-container"
        v-for="site in sitesList"
        :key="site.id"
      >
        <router-link :to="'/sites/' + site.id" class="site-link">
          <SiteAnchorCard :site="site" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";

import { PROPERTY_TYPES } from "@/helpers/constants.ts";

import {
  getSitesByPageNumber,
  getSitesByCategory,
  getSitesByQuery,
} from "@/helpers/getSites.ts";

import HeaderComponent from "@/components/HeaderComponent.vue";
import SiteAnchorCard from "@/components/SiteAnchorCard.vue";

export default {
  components: {
    HeaderComponent,
    SiteAnchorCard,
  },

  setup() {
    const sitesList = ref<any[]>([{}]);
    const searchQuery = ref<string>("");
    const pageNumber = ref<number>(1);
    const scrollComponent = ref<any>(null);
    const categorySelected = ref<boolean>(false);

    onBeforeMount(async () => {
      sitesList.value = await getSitesByPageNumber(pageNumber.value);
    });

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const loadMoreSites = async () => {
      const newPage = pageNumber.value + 1;
      let newSites = await getSitesByPageNumber(newPage);
      sitesList.value.push(...newSites);
      pageNumber.value = newPage;
    };

    const handleScroll = () => {
      let element = scrollComponent.value;

      const isBottomReached =
        element?.getBoundingClientRect().bottom <= window.innerHeight;

      const isAbleToScroll =
        !categorySelected.value && searchQuery.value.length === 0;

      if (isBottomReached && isAbleToScroll) {
        loadMoreSites();
      }
    };

    const handleChangeProperty = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.value === "All Sites") {
        const resetPage = 1;
        sitesList.value = await getSitesByPageNumber(resetPage);
        pageNumber.value = resetPage;
        categorySelected.value = false;
      } else {
        sitesList.value = await getSitesByCategory(target.value);
        categorySelected.value = true;
      }
    };

    const handleSearch = async () => {
      console.log(searchQuery.value);
      if (searchQuery.value !== "") {
        sitesList.value = await getSitesByQuery(searchQuery.value);
      } else {
        const resetPage = 1;
        sitesList.value = await getSitesByPageNumber(resetPage);
        pageNumber.value = resetPage;
      }
    };

    return {
      searchQuery,
      sitesList,
      scrollComponent,
      PROPERTY_TYPES,
      handleChangeProperty,
      handleSearch,
    };
  },
};
</script>

<style lang="scss">
.section-title {
  background-color: #2a77e4;
  padding: 10px;
  border-bottom: 2px solid #3c3c3c;
  text-align: center;
  color: #fff;

  h2 {
    margin: 0;
    font-weight: 400;
  }
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-top: 1px;

  .search-box {
    display: flex;
    align-items: center;
    color: #3c3c3c;
    background: #ccc;
    padding-right: 5px;
  }

  select,
  input[type="text"] {
    border: 2px solid #ccc;
    color: #3c3c3c;
    &:focus-visible {
      border-color: #525252;
      outline: none;
    }
  }

  select {
    height: 36px;
  }

  input[type="text"] {
    height: 30px;
    width: 105px;
    margin-right: 5px;
  }
}
</style>
