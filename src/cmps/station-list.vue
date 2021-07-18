<template>
  <section class="station-list">
    <carousel
      v-if="$route.name === 'home'"
      :per-page="5"
      :mouse-drag="true"
      ref="carousel"
      :navigationEnabled="true"
      :paginationEnabled="false"
      :loop="true"
      :navigationNextLabel="nextLabel"
      :navigationPrevLabel="prevLabel"
      :count="stations.length"
    >
      <slide v-for="station in stations" :key="station._id">
        <station-preview :station="station" />
      </slide>
    </carousel>
    <div v-else v-for="station in stations" :key="station._id">
      <station-preview :station="station" />
    </div>
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
  name: "explore",
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
      return '<button class="btn-next" ><svg width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-right" class="carousel-right-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path></svg></button>';
    },
    prevLabel() {
      return '<button class="btn-prev" ><svg width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-left" class="carousel-left-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"></path></svg></button>';
    },
  },
  methods: {},

  mounted() {
    //Hacked way to make stations appear on start
    if (this.$refs["carousel"]) {
      setTimeout(() => {
        this.$refs["carousel"].onResize();
        this.$refs["carousel"].goToPage(0);
      }, 200);
    }
  },

  components: {
    stationPreview,
    Carousel,
    Slide,
  },
};
</script>
