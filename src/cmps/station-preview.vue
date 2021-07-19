<template>
  <section class="station-preview" v-if="station"  >
    <router-link :to="'/details/' + station._id">
      <div class="station-preview-card" :style="stationImg">
       
        <img v-if="station.songs && station.songs.length"
          :src="station.songs[0].imgUrl" :alt="station.name"
        />
      </div>
       <h2  class="station-preview-name">{{ station.name }}</h2>
       <h3  class="station-preview-creator">{{ station.createdBy.fullname }}</h3>
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
