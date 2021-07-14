<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
import appHeader from '@/cmps/app-header'
export default {
  components: {
    appHeader,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
