<template>
  <section class="song-preview-container">
      <img :src="song.imgUrl" alt="" />
      <h3>{{ song.title }}</h3>

  </section>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
    },
  },
};
</script>

<style>
</style>