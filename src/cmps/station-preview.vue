<template>
  <section class="station-preview" v-if="station" :style="stationImg" >
    <router-link :to="'/details/' + station._id">
      <div class="station-preview-card">
        <span class="station-preview-name">{{ station.name }}</span>
        <img
          :src="station.songs[0].imgUrl" :alt="station.name"
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
  computed:{
    stationImg(){
      const style={
        'background-image':`url(${this.station.imgUrl})`,
        'background-repeat':'no-repeat',
        'background-size':'cover'
      };
      return style;
    }
  }
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
