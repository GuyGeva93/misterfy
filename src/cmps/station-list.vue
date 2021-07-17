<template>
  <section class="station-list">
    <carousel
      :per-page="4"
      :mouse-drag="true"
      ref="carousel"
      :navigationEnabled="true"
      :loop="true"
      :navigationNextLabel="nextLabel"
      :navigationPrevLabel="prevLabel"
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
import stationPreview from "./station-preview.vue";
import { Carousel, Slide } from "vue-carousel";
export default {
  props: {
    stations: {
      type: Array,
    },
  },
  data() {
    return {
      frequency: 1,
    };
  },
  created() {
    this.frequency++;
  },
  computed: {
    nextLabel() {
      return '<button class="btn-next" >Next </button>';
    },
    prevLabel() {
      return '<button class="btn-prev" >Previous </button>';
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
