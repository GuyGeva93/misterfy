<template>
  <section class="song-results">
    <div v-for="song in results" :key="song.id.videoId">
      <div>{{song.snippet.title}}</div>
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

}
</script>
