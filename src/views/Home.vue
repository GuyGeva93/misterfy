<template>
  <div class="home-page">
    <div class="hero-txt"><h1>HERO</h1></div>
    <div class="hero-img">
      <img src="@/assets/hero.png" alt="" />
    </div>
    <h2>TOP 10</h2>
    <station-list :stations="stations" />
    <br />
    <br />
    <br />
    <h2>YOUR PICKS</h2>
    <station-list :stations="stations" />
    <br />
    <br />
    <br />
    <h2>RECOMENDED FOR YOU</h2>
    <station-list :stations="stations" />
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
      return this.$store.getters.stationsToDisplay;
    },
  },
  mounted() {
    // console.log(this.$store.getters);
  },
};
</script>
