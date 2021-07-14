<template>
  <section class="station-list">
    <div
      class="station-list-conatiner"
      v-for="station in stations"
      :key="station._id"
    >
      <station-preview :station="station" />
    </div>
  </section>
</template>

<script>
import stationPreview from "./station-preview.vue";
export default {
  props:{
    stations:{
      type: Array
    }
  },
  data() {
    return {
      // stations: [
      //   {
      //     _id: 's101',
      //     name: 'Hip Hop',
      //   },
      //   {
      //     _id: 's102',
      //     name: 'Israeli',
      //   },
      //   {
      //     _id: 's103',
      //     name: 'Rock',
      //   },
      //   {
      //     _id: 's104',
      //     name: 'Chill',
      //   },
      //   {
      //     _id: 's105',
      //     name: 'Relax',
      //   },
      // ],
    };
  },
  created () {
    console.log(this.stations);
  },

  components: {
    stationPreview,
  },
};
</script>
