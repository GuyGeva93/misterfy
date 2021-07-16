<template>
  <section class="station-details" v-if="station">
    <chat :stationId="stationId" class="section-details-chat" />
    <section class="station-details-img">
      <img
        src="https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6a/e4/59/6ae45956-8b3d-0ff2-81f8-587c7c65b515/source/256x256bb.jpg"
      />
    </section>
    <section class="station-details-info">
      <h3>Title: {{ station.name }}</h3>
      <h4>Tags: {{ getTags }}</h4>
    </section>
    <song-list-options @search="search" @opened="opened"/>
    <section class="station-list-container" :class="{open: isOpen}">
      <song-list :songs="station.songs" />
    </section>
  </section>
</template>

<script>
import { stationService } from "@/services/station-service.js";
import { youtubeService } from "@/services/youtube-service.js";

import songListOptions from "@/cmps/song-list-options.vue";

import songList from "@/cmps/song-list";
import chat from "@/cmps/chat";
export default {
  async created() {
    const { stationId } = this.$route.params;
    this.station = await stationService.getById(stationId);
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
    getTags() {
      return this.station.tags.join(',')
    },
     station(){
       return 
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
