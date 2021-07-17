<template>
  <section class="player" v-if="songId">
    <section class="player-controls">
      <span>⏪</span>
      <span v-if="isPlay" @click.stop="togglePlay">▶</span>
      <span v-else @click.stop="togglePlay">⏸</span>
      <span>⏩</span>
    </section>
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
export default {
  data() {
    return {
      currSongId: "",
      isPlay: false
    };
  },
  mounted() {
    if (!this.$refs.plyr) return;

    this.$refs.plyr.player.on("ready", () => {
      this.$refs.plyr.player.play();
    });
    // this.$refs.plyr.player.on("pause", () => {
    //   console.log('pause')
    //   this.$refs.plyr.player.pause();
    // });
    this.$refs.plyr.player.on("ended", () => {
      this.$store.commit({ type: 'nextSong' })
      this.$refs.plyr.player.play();
    });
  },

  methods: {
    togglePlay() {
      if (this.isPlay) {
        console.log('play')
        this.$refs.plyr.player.play()
      } else {
        console.log('pause')
        this.$refs.plyr.player.pause()
      }
      this.isPlay = !this.isPlay
    },
    // play(songId) {
    //   this.$store.commit({ type: "loadSongToPlayer", songId });
    //   eventBusService.$emit("playSong");
    //   this.isPlaying = true
    // },
  },
  computed: {
    songId() {
      return this.$store.getters.currSongId;
    },
    src() {
      return `https://www.youtube.com/embed/${this.songId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    },
  },

};
</script>

<style>
</style>