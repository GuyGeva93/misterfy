<template>
  <section
    class="station-details"
    v-if="currStation"
  >
    <chat :stationId="stationId" class="section-details-chat" />

    <section ref="img" >
      <img class="station-details-img" :src="currStation.imgUrl" />
    </section>
    <section class="station-details-info">
      <h3>Title: {{ currStation.name }}</h3>
      <!-- <h4>Tags: {{ getTags }}</h4> -->
    </section>
    <song-list-options @search="search" @opened="opened" />
    <button @click.stop="nextSong">Next</button>
    <button @click.stop="prevSong">Prev</button>
    <section class="station-list-container" :class="{ open: isOpen }">
      <song-list :songs="currStation.songs" />
    </section>
  </section>
</template>

<script>
// import ColorThief from "colorthief";
// import { stationService } from "@/services/station-service.js";
import { youtubeService } from "@/services/youtube-service.js";
import songListOptions from "@/cmps/song-list-options.vue";
import songList from "@/cmps/song-list";
import chat from "@/cmps/chat";
export default {
  async created() {
    const { stationId } = this.$route.params;
    this.$store.dispatch({ type: "currStation", stationId });
  },
  data() {
    return {
      // station: null,
      isSearch: false,
      isOpen: false,
      // colorThief: new ColorThief(),
      mainColor: null,
    };
  },

  computed: {
    stationId() {
      return this.$route.params.stationId;
    },
    // getTags() {
    //   return this.station.tags.join(',')
    // },
    currStation() {
      return this.$store.getters.currStation;
    },
     mainImg() {
       return this.$store.getters.currStation.imgUrl
       
    },
    getMainColor() {
      return this.mainColor
    },
  },

  methods: {
    addSong() {},
    async search(query) {
      const res = await youtubeService.query(query);
      res.items.map((item) => {
        console.log("video id:", item.id.videoId);
        console.log("video snippet:", item.snippet.title);
        console.log("video thumbnail:", item.snippet.thumbnails.default.url);
        console.log("video publishedAt:", item.snippet.publishedAt);
      });
    },

    opened() {
      this.isOpen = !this.isOpen;
    },

    nextSong() {
      this.$store.commit({ type: "nextSong" });
    },
    prevSong() {
      this.$store.commit({ type: "prevSong" });
    },
  },
  mounted () {
  },

  components: {
    songList,
    chat,
    songListOptions,
  },
};
</script>
