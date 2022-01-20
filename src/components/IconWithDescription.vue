<template>
  <section class="icon-info">
    <figure class="icon-info__icon">
      <font-awesome-icon class="fa-lg" :icon="icon" />
    </figure>
    <div class="icon-info__description">
      <p>
        {{ title }}
      </p>
      <span v-if="description"> {{ description }} </span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    description: String,
  },
};
</script>

<style lang="scss">
.icon-info {
  display: flex;
  padding: 25px 30px 0;
  align-content: flex-start;

  &__icon {
    margin: 0;
    width: 25px;
  }

  &__description {
    margin-left: 15px;

    p {
      margin: 0;
    }
    span {
      font-size: 15px;
      color: #858585;
    }
  }
}
</style>
