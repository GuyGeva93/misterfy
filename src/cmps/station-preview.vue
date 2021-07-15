<template>
  <section class="station-preview">
    <router-link :to="'/details/' + station._id">
      <div class="station-preview-card" @click="play">
        <span class="station-preview-name">{{ station.name }}</span>
        <img
          src="https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6a/e4/59/6ae45956-8b3d-0ff2-81f8-587c7c65b515/source/256x256bb.jpg"
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
