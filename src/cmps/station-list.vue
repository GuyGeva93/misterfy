<template>
  <section class="station-list">
    <carousel
      :per-page="5"
      :mouse-drag="true"

      ref="carousel"
      :navigationEnabled="true"
      :paginationEnabled="false"
      :loop="true"
      :navigationNextLabel="nextLabel"
      :navigationPrevLabel="prevLabel"
      :count="stations.length"
      @navigation-click="navClick"
    >
      <slide v-for="station in stations" :key="station._id">
        <station-preview :station="station" />
      </slide>
    </carousel>
  </section>
</template>

<script>
// carousel autoplay
// :autoplay="true"
//  :autoplayTimeout="1000"
//       :autoplayHoverPause="false"
//speed of the carousel sliding
//      :speed="500"
import stationPreview from "./station-preview.vue";
import { Carousel, Slide } from "vue-carousel";
export default {
  props: {
    stations: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {
    nextLabel() {
      return '<button class="btn-next" >➡ </button>';
    },
    prevLabel() {
      return '<button class="btn-prev" >⬅ </button>';
    },
  },
  methods: {
    navClick() {
      // console.log(this.$refs["carousel"]);
    },
  },

  mounted() {
    //Hacked way to make stations appear on start
    setTimeout(() => {
      this.$refs["carousel"].onResize();
      this.$refs["carousel"].goToPage(0);
    }, 200);
  },

  components: {
    stationPreview,
    Carousel,
    Slide,
  },
};
</script>
