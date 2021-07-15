<template>
  <section class="song-preview">
    <h3 v-if="!isPlaying">{{ idx + 1 }}</h3>
    <img :src="song.imgUrl" />
    <h3>{{ song.title }}</h3>
    <h3>352,587</h3>
    <button class="like-song">🤍</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false
    }
  },
  props: {
    song: {
      type: Object,
    },
    idx: {
      type: Number,
    },
  },
};
</script>

<style>
</style>