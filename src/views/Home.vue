<template>
  <div class="home">
    <header>
      <HeaderComponent />
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
          <input type="submit" value="Search" />
        </form>
      </div>
    </section>
    <section class="sites-list" ref="scrollComponent">
      <div class="site-title" v-for="site in sitesList" :key="site.id">
        {{ site.title }}
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
} from "@/helpers/getSites.ts";

import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
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

      const isElementVisible =
        element?.getBoundingClientRect().bottom < window.innerHeight;

      const isAbleToScroll =
        !categorySelected.value && searchQuery.value.length == 0;

      if (isElementVisible && isAbleToScroll) {
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

    const handleSearch = async (event: Event) => {
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

    return {
      searchQuery,
      sitesList,
      scrollComponent,
      PROPERTY_TYPES,
      handleChangeProperty,
    };
  },
};
</script>

<style lang="scss">
.site-title {
  margin-bottom: 25px;
}
</style>
