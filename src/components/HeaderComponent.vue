<template>
  <section class="header">
    <font-awesome-icon class="fa-lg" icon="bars" />
    <h1>{{ title }}</h1>
    <font-awesome-icon class="fa-lg" icon="th" />
    <div class="header__session-id">
      <span>F</span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  background-color: #2a77e4;
  padding: 10px;
  border-bottom: 1px solid;

  h1 {
    margin: 0 0 0 25px;
    flex: 1;
    text-align: center;
    color: #fff;
  }

  &__session-id {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-left: 5px;
    text-align: center;
    border: 1px solid;
    border-radius: 50%;
    background-color: #fff;
  }
}
</style>
