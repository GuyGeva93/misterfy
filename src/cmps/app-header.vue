<template>
  <header>
    <div class="logo" @click="goHome">Misterfy</div>
    <filter-text-search @search="search" />
    <nav class="main-nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/add">Creatify</router-link> | -->
      <button @click.stop="toggleCreating">Creatify</button> |
      <router-link to="/explore">Explore</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <station-add v-if="isCreating" @closeModal="toggleCreating" />
  </header>
</template>

<script>
import filterTextSearch from "@/cmps/filter-text-search";
// import { youtubeService } from "@/services/youtube-service.js";
import stationAdd from "@/cmps/station-add.vue";
export default {
  data() {
    return {
      isCreating: false,
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    search(name) {
      //Preventing duplicated route error
      const currName=this.$route.params.name;
     if((currName && currName===name))return;
     if(!name)name='*';
     let url="/explore/" + name;
     if(this.tag)url+='/'+this.tag;
      this.$router.push(url)
      .catch(err=>{
        //When same route appears
         if (err.name != "NavigationDuplicated") {
    throw err;
  }
      });

      //   const res = await youtubeService.name(name);
      //   res.items.map((item) => {
      //     console.log("video id:", item.id.videoId);
      //     console.log("video snippet:", item.snippet.title);
      //     console.log("video thumbnail:", item.snippet.thumbnails.default);
      //     console.log("video publishedAt:", item.snippet.publishedAt);
      //   });
    },

    toggleCreating() {
      return (this.isCreating = !this.isCreating);
    },
  },
  computed:{
    tag(){
    return this.$route.params.tag;  
    }
  },

  components: {
    filterTextSearch,
    stationAdd,
  },
};
</script>
