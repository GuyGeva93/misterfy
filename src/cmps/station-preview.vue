<template>
  <section class="station-preview">
    <router-link :to="'/details/' + station._id">
      <div class="station-preview-card" @click="play">
        <span class="station-preview-name">{{ station.name }}</span>
        <img
          :src="station.imgUrl"
        />
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  props: {
    station: {
      type: Object,
    },
  },
  created() {
    // console.log('this.station',this.station);
  },
  methods: {
    play() {
      // console.log("Play station");
    },
    // details(stationId) {
    //   this.$router.push(`/details/${stationId}`);
    // },
  },
}
</script>
