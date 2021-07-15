<template>
  <section class="song-list-options">
    <div>♥</div>
    <div @click.stop="toggleSearch">➕</div>
    <input type="search" placeholder="Search for a song" v-if="isSearch" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      isSearch: false,
    };
  },

  methods: {
    toggleSearch() {
      this.isSearch = !this.isSearch
    },
  },
};
</script>
