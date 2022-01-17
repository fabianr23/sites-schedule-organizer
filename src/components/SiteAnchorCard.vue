<template>
  <section class="site-anchor">
    <div v-if="arrowPosition === 'left'" class="site-anchor__arrow">
      <font-awesome-icon icon="angle-left" />
    </div>
    <figure class="site-anchor__image">
      <!-- TODO: apply below format once API response has images working -->
      <!-- <img :src="site?.images ? site.images[0] : IMAGE_NOT_FOUND" alt="" /> -->
      <img :src="IMAGE_NOT_FOUND" :alt="site?.title + ' image'" />
    </figure>
    <div class="site-anchor__description">
      <h2>{{ site?.title }}</h2>
      <address>{{ site?.address?.street }} - {{ site?.address?.city }}</address>
      <span>{{ site?.contacts?.main?.email }}</span>
    </div>
    <div v-if="arrowPosition === 'right'" class="site-anchor__arrow">
      <font-awesome-icon icon="angle-right" />
    </div>
  </section>
</template>

<script>
import { IMAGE_NOT_FOUND } from "@/helpers/constants.ts";

export default {
  props: {
    site: Object,
    arrowPosition: String,
  },

  setup() {
    return {
      IMAGE_NOT_FOUND,
    };
  },
};
</script>

<style lang="scss">
.site-anchor {
  display: flex;
  border: 1px solid #ccc;
  padding-bottom: 10px;
  figure {
    width: 50px;
    min-width: 50px;
    height: 50px;
    border: 2px solid #ddd;
    border-radius: 50%;
    margin: 20px 10px;

    @media (min-width: 768px) {
      width: 100px;
      height: 100px;
      margin: 20px 35px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__description {
    flex: 1;
    h2 {
      margin: 10px 0;
      font-size: 18px;
      color: #000;
    }
    address,
    span {
      color: #3c3c3c;
    }
    address {
      font-size: 14px;
    }
    span {
      display: block;
      margin-top: 5px;
      font-size: 13px;
    }
  }

  &__arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 25px;
    min-height: 100%;
  }
}
</style>
