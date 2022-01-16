<template>
  <div class="site-detail">
    <header>
      <HeaderComponent />
    </header>
    <main>
      <h2>Site Details</h2>
      <p>id: {{ site.id }}</p>
      <p>name: {{ site.title }}</p>
    </main>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

import { getSitesByFilter } from "@/helpers/getSites.ts";

import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },

  setup() {
    const site = ref({});
    const route = useRoute();

    onBeforeMount(() => {
      onBeforeMount(async () => {
        const siteInfo = await getSitesByFilter("id", route.params.id);
        site.value = siteInfo[0];
      });
    });

    return {
      site,
    };
  },
};
</script>

<style></style>
