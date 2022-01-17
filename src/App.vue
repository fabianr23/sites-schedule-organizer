<template>
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  cursor: pointer;
  text-decoration: none;
}

.wrap-container {
  width: 100%;
  @media (min-width: 768px) {
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>
