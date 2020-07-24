<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>
<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  height: 100%;
  background: no-repeat fixed
    linear-gradient(0deg, rgba(67, 0, 252, 1) 1%, rgba(45, 175, 253, 1) 100%);
  color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
