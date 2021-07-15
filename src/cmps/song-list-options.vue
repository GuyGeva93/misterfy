<template>
  <section class="song-list-options">
    <div >
      <span @click="toggleStationLike" :class="{liked: isLiked}">❤</span>
    </div>
    <div>✖</div>
    <div @click.stop="toggleSearch">➕</div>
    <form class="song-list-search" :class="{ open: isSearch }">
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
import songResults from "@/cmps/song-results.vue";
import { youtubeService } from "@/services/youtube-service.js";

export default {
  data() {
    return {
      isSearch: false,
      txt: "",
      results: [],
      isLiked: false
    };
  },

  methods: {
    toggleSearch() {
      this.$emit("opened");
      this.isSearch = !this.isSearch;
    },
    async search(query) {
      if (!query) {
        this.results = [];
        return;
      }
      this.results = await youtubeService.query(query);
      console.log("this.results", this.results);
    },
    toggleStationLike(){
      this.isLiked = !this.isLiked
    }
  },
  components: {
    songResults,
  },
};
</script>
