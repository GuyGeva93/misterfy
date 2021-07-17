<template>
  <section class="song-preview" @click.stop="play(song.id)">
    <svg class="song-preview-play-btn" @click.stop="play(song.id)" width="30px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"></path></svg>
    <!-- <button v-else @click.stop="play(song.id)">⏸</button> -->
    <h3>{{ idx + 1 }}</h3>
    <img class="thumbnail" :src="song.imgUrl" />
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