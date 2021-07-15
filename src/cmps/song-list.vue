<template>
  <section class="songs-list-container">
    <ul class="songs-list">
      <li v-for="song in songs" :key="song._id">
        <song-preview :song="song" />
      </li>
    </ul>
  </section>
</template>

<script>
import songPreview from "@/cmps/song-preview";
export default {
  props: {
    songs: {
      type: Array,
    },
  },
  components: {
    songPreview,
  },
};
</script>

<style>
</style>