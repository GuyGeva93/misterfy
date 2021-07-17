<template>
  <section class="song-preview" @click.stop="play(song.id)">
    <button @click.stop="play(song.id)">▶</button>
    <!-- <button v-else @click.stop="play(song.id)">⏸</button> -->
    <h3>{{ idx + 1 }}</h3>
    <img :src="song.imgUrl" />
    <h3>{{ song.title }}</h3>
    <h3>352,587</h3>
    <button class="like-song">🤍</button>
  </section>
</template>

<script>
import { eventBusService } from '@/services/eventBus-service.js'

export default {
  props: {
    song: {
      type: Object,
    },
    idx: {
      type: Number,
    },
  },
  data() {
    return {
      isPlaying: false,
    };
  },
  methods: {
    play(songId) {
      this.$store.commit({ type: "loadSongToPlayer", songId });
      eventBusService.$emit("playSong");
      this.isPlaying = true
    },
  },
};
</script>

<style>
</style>