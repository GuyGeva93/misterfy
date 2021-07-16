<template>
  <section class="station-details" v-if="currStation">
    <chat :stationId="stationId" class="section-details-chat" />
    <section class="station-details-img">
      <img
        :src="currStation.imgUrl"
      />
    </section>
    <section class="station-details-info">
      <h3>Title: {{ currStation.name }}</h3>
      <!-- <h4>Tags: {{ getTags }}</h4> -->
    </section>
    <song-list-options @search="search" @opened="opened"/>
    <section class="station-list-container" :class="{open: isOpen}">
      <song-list :songs="currStation.songs" />
    </section>
  </section>
</template>

<script>
// import { stationService } from "@/services/station-service.js";
import { youtubeService } from "@/services/youtube-service.js";

import songListOptions from "@/cmps/song-list-options.vue";

import songList from "@/cmps/song-list";
import chat from "@/cmps/chat";
export default {
  async created() {
    const { stationId } = this.$route.params;
    this.$store.dispatch({type: 'currStation', stationId})
    // this.station = await stationService.getById(stationId);
  },
  data() {
    return {
      // station: null,
      isSearch: false,
      isOpen: false
    };
  },
  

  computed: {
    stationId() {
      return this.$route.params.stationId;
    },
    // getTags() {
    //   return this.station.tags.join(',')
    // },
     currStation(){
       return this.$store.getters.currStation 
    }
  },

  methods: {
    addSong() { },
    async search(query) {
      const res = await youtubeService.query(query);
      res.items.map((item) => {
        console.log("video id:", item.id.videoId);
        console.log("video snippet:", item.snippet.title);
        console.log("video thumbnail:", item.snippet.thumbnails.default.url);
        console.log("video publishedAt:", item.snippet.publishedAt);
      });
    },

    opened(){
      this.isOpen = !this.isOpen
    }
  },

  components: {
    songList,
    chat,
    songListOptions,
  },
};
</script>
