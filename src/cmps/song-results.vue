<template>
  <section class="song-results">
    <div v-for="song in results" :key="song.id.videoId">
      <div @click.stop="addSong(song)">{{ song.snippet.title }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
    },
  },
  methods: {
    addSong(song) {
      const {stationId} = this.$route.params;
      this.$store.dispatch({ type: "addSong", song, stationId });
      
    },
  },
};
</script>
