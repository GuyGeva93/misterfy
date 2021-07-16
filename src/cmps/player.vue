<template>
  <section class="player" v-if="songId">
    <vue-plyr ref="plyr">
      <div class="plyr__video-embed" id="player">
        <iframe :src="src" allowtransparency allow="autoplay"></iframe>
      </div>
      <!-- <div
        ref="plyr"
        data-plyr-provider="youtube"
        :data-plyr-embed-id="songId"
      ></div> -->
    </vue-plyr>
  </section>
</template>

<script>
// import { eventBusService } from "@/services/eventBus-service.js";
export default {
  data() {
    return {
      currSongId: "",
      // isPlaying: false,
    };
  },
  mounted() {
    if (!this.$refs.plyr) return;

    this.$refs.plyr.player.on("ready", (event) => {
      console.log(event);
      // console.log(this.$refs);
      this.$refs.plyr.player.play();
    });
    this.$refs.plyr.player.on("ended", (event) => {
      console.log(event);
      // console.log(this.$refs);
      this.$store.commit({type:'nextSong'})
      this.$refs.plyr.player.play();
    });
  },
  computed: {
    songId() {
      return this.$store.getters.currSongId;
    },
    src() {
      return `https://www.youtube.com/embed/${this.songId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    },
  },
  created() {
    // this.currSongId = this.$store.getters.currSongId;
  },
};
</script>

<style>
</style>