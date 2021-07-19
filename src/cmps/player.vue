<template>
  <section class="player" v-if="songId">
    <song-info-slider class="song-info-slider" />
    <section class="player-controls">
      <span @click.stop="prevSong">
        <img class="player-previous-btn" src="../assets/icons/next.png" />
      </span>
      <span v-if="isPlay" @click.stop="togglePlay">
        <img class="player-play-btn" src="../assets/icons/play-button.png" />
      </span>
      <span v-else @click.stop="togglePlay">
        <img class="player-pause-btn" src="../assets/icons/pause.png" />
      </span>
      <span @click.stop="nextSong">
        <img class="player-forward-btn" src="../assets/icons/next.png" />
      </span>
    </section>
    <vue-plyr ref="plyr">
      <div class="plyr__video-embed" id="player">
        <iframe :src="src" allowtransparency allow="autoplay"></iframe>
      </div>
    </vue-plyr>
  </section>
</template>

<script>
import songInfoSlider from "@/cmps/song-info-slider.vue";
export default {
  data() {
    return {
      currSongId: "",
      currSong: {},
      isPlay: false,
    };
  },
  mounted() {
    this.currSong = this.$store.getters.currSong;

    if (!this.$refs.plyr) return; // When player isn't ready

    this.$refs.plyr.player.on("ready", () => {
      this.$refs.plyr.player.play();
    });
    this.$refs.plyr.player.on("playing", () => {
      this.$store.commit({ type: "isPlaying" });
    });
    this.$refs.plyr.player.on("pause", () => {
      this.$store.commit({ type: "isPlaying" });
    });
    this.$refs.plyr.player.on("ended", () => {
      this.$store.commit({ type: "nextSong" });
      this.$store.commit({ type: "setCurrSong" });
      this.$refs.plyr.player.play();
    });
  },
  methods: {
    togglePlay() {
      if (this.isPlay) {
        this.$refs.plyr.player.play();
      } else {
        this.$refs.plyr.player.pause();
      }
      this.isPlay = !this.isPlay;
    },
    prevSong() {
      this.$store.commit({ type: "prevSong" });
      this.$store.commit({ type: "setCurrSong" });
    },
    nextSong() {
      this.$store.commit({ type: "nextSong" });
      this.$store.commit({ type: "setCurrSong" });
    },
  },
  computed: {
    songId() {
      return this.$store.getters.currSongId;
    },
    src() {
      return `https://www.youtube.com/embed/${this.songId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
    },
  },

  components: {
    songInfoSlider,
  },
};
</script>
