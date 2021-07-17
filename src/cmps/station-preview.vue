<template>
  <section class="station-preview" v-if="station">
    <router-link :to="'/details/' + station._id">
      <div class="station-preview-card">
        <span class="station-preview-name">{{ station.name }}</span>
        <img
          :src="station.imgUrl" :alt="station.name"
        />
          <!-- @load="play" -->
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
  // created() {
  //   // console.log('this.station',this.station);
  // },
  // methods: {
  //   play(ev) {
  //     console.log(ev);
  //     // console.log("Play station");
  //   },
 
  // },
}
</script>
