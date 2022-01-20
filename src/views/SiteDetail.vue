<template>
  <div class="site-detail wrap-container">
    <header>
      <HeaderComponent :title="'Scheduling'" />
      <SiteAnchorCard
        class="site-detail__site-anchor"
        @click="$router.go(-1)"
        :site="site"
        :arrow-position="'left'"
      />
    </header>
    <main>
      <figure class="site-detail__placeholder-image">
        <img :src="IMAGE_PLACEHOLDER" alt="placeholder image" />
      </figure>
      <IconWithDescription
        icon="user"
        :title="
          site.contacts?.main?.firstName + ' ' + site.contacts?.main?.lastName
        "
        :description="site.contacts?.main?.jobTitle"
      />

      <IconWithDescription
        icon="phone"
        :title="site.contacts?.main?.phoneNumber"
      />

      <IconWithDescription
        icon="mail-bulk"
        :title="site.contacts?.main?.email"
      />

      <IconWithDescription
        icon="map-marker-alt"
        :title="
          site.contacts?.main?.address?.street +
          ' -- ' +
          site.contacts?.main?.address?.city
        "
      />
    </main>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

import { getSitesByFilter } from "@/helpers/getSites.ts";

import { IMAGE_PLACEHOLDER } from "@/helpers/constants.ts";

import HeaderComponent from "@/components/HeaderComponent.vue";
import SiteAnchorCard from "@/components/SiteAnchorCard.vue";
import IconWithDescription from "@/components/IconWithDescription.vue";

export default {
  components: {
    HeaderComponent,
    SiteAnchorCard,
    IconWithDescription,
  },

  setup() {
    const site = ref({});
    const route = useRoute();

    onBeforeMount(async () => {
      const siteInfo = await getSitesByFilter("id", route.params.id);
      site.value = siteInfo[0];
    });

    return {
      site,
      IMAGE_PLACEHOLDER,
    };
  },
};
</script>

<style lang="scss">
.site-detail {
  &__placeholder-image {
    margin: 0;
    width: 100%;
    height: 250px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__site-anchor {
    background-color: #2a77e4;
    h2 {
      color: #fff;
    }

    .site-anchor {
      &__description {
        address,
        span {
          color: #000;
        }
      }
      &__arrow {
        color: #fff;
        width: 40px;
        svg {
          height: 25px;
          width: 25px;
        }
      }
      figure {
        background-color: #fff;
      }
    }
  }
}
</style>
