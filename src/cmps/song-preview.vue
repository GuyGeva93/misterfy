<template>
  <section class="song-preview">
    <button @click.stop="play(song.id)">Play</button>
    <h3 v-if="!isPlaying">{{ idx + 1 }}</h3>
    <img :src="song.imgUrl" />
    <h3>{{ song.title }}</h3>
    <h3>352,587</h3>
    <button class="like-song">🤍</button>
  </section>
</template>

<script>
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
      isPlaying: false
    }
  },
  methods: {
    play(songId) {
      this.$store.commit({type:'playSong', songId})
    }
  },
};
</script>

<style>
</style>