<template>
  <div id="app">
    <app-header />
    <main>
      <router-view />
    </main>
    <!-- <app-footer/> -->
    <player :key="this.$store.getters.currSongId" />
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header";
// import appFooter from "@/cmps/app-footer";
import player from '@/cmps/player'
export default {
  components: {
    appHeader,
    // appFooter,
    player
  },
  created() {
    this.$store.dispatch({ type: 'loadStations' });
  },

}
</script>


