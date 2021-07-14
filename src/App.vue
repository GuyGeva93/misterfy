<template>
  <div id="app">
    <app-header/>
    <player/>
    <router-view/>
  </div>
</template>

<script>
import appHeader from '@/cmps/app-header'
import player from '@/cmps/player'
export default {
  components: {
    appHeader,
    player
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
