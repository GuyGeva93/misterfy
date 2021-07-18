<template>
  <div class="home-page">
    <div class="hero-txt">
      <h1 class="first">LISTENING</h1>
      <h1 class="second">IS</h1>
      <h1 class="third">EVERYTHING</h1>
      <div class="hero-arrrows container">
        <div class="chevron"></div>
        <div class="chevron"></div>
        <div class="chevron"></div>
      </div>
    </div>
    <div class="hero-img">
      <img src="@/assets/img/hero.png" alt="" />
    </div>
    <div class="station-main">
      <h2>TOP PICKS</h2>
      <station-list :stations="topPicks" v-if="topPicks" />
      
      <h2>YOUR PICKS</h2>
      <station-list :stations="yourPicks" v-if="yourPicks"/>
      
      <h2>RECOMENDED FOR YOU</h2>
      <station-list :stations="recomended" v-if="recomended"/>
    </div>
  </div>
</template>

<script>
import stationList from "@/cmps/station-list";
export default {
  name: "home",
  components: {
    stationList,
  },
  computed: {
    stations() {
      const stations= this.$store.getters.stationsToDisplay;
      return stations;
    },
    topPicks(){
      return this.stations.slice(0,6)
    },
    yourPicks(){
      return this.stations.slice(6,11)
    },
    recomended(){
       return this.stations.slice(11)
    }
  },

  mounted() {
    // console.log(this.$store.getters);
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        //reset filter when coming home page
        this.$store.commit({ type: "setFilter" });
      },
    },
  },
};
</script>
