<template>
  <div class="home-page">
    <div class="hero-txt">
      <h1 class="first">LISTENING</h1>
      <h1 class="second"> IS</h1>
      <h1 class="third"> EVERYTHING</h1>
      </div>
    <div class="hero-img">
      <img src="@/assets/img/hero.png" alt="" />
    </div>
   <div class="station-main">
      <h2>TOP 10</h2>
    <station-list :stations="stations" />
    <br />
    <br />
    <br />
    <h2>YOUR PICKS</h2>
    <station-list :stations="stations"  />
    <br />
    <br />
    <br />
    <h2>RECOMENDED FOR YOU</h2>
    <station-list :stations="stations" />
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
  },
  

  mounted() {
    // console.log(this.$store.getters);
  },
  watch:{
    '$route':{
      immediate:true,
      handler(){
       //reset filter when coming home page
         this.$store.commit({type:'setFilter'});
      }
    }
  }
};
</script>
