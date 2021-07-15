<template>
  <header>
    <div class="logo" @click="goHome">Misterfy</div>
    <filter-text-search @search="search"/>
    <nav class="main-nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/explore">Explore</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
import filterTextSearch from "@/cmps/filter-text-search";
import {youtubeService} from '@/services/youtube-service.js'
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
   async search(query){
     console.log('bla');
      const res = await youtubeService.query(query)
      res.items.map(item=>{
        console.log('video id:',item.id.videoId);
        // console.log('video snippet:',item.snippet);
        console.log('video snippet:',item.snippet.title);
        console.log('video thumbnail:',item.snippet.thumbnails.default);
        console.log('video publishedAt:',item.snippet.publishedAt);

      })
    }
  },
  components: {
    filterTextSearch,
  },
};
</script>

<style>
</style>