<template>
  <section class="song-list-options">
    <div>♥</div>
    <div>🚮</div>
    <div @click.stop="toggleSearch">➕</div>
    <form class="song-list-search" :class="{open: isSearch}" @opened="opened">
      <input
        v-debounce="search"
        type="text"
        v-model="txt"
        v-if="isSearch"
        placeholder="Search for a song"
      />
    </form>
    <song-results :results="results.items" />
  </section>
</template>

<script>
import songResults from '@/cmps/song-results.vue'
import { youtubeService } from '@/services/youtube-service.js'
export default {
  data() {
    return {
      isSearch: false,
      txt: '',
      results: []
    };
  },

  methods: {
    toggleSearch() {
      this.isSearch = !this.isSearch
    },
    async search(query) {
      if (!query) {
        this.results = []
        return
      }
      this.results = await youtubeService.query(query)
      console.log('this.results', this.results)
    },
    opened(){
      this.$emit('opened')
    }
  },
  components: {
    songResults,
  },
}
</script>
