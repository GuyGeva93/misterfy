<template>
  <section ref="grid" class="station-details" v-if="currStation">
    <chat :stationId="stationId" class="section-details-chat" />
    <img ref="img" class="station-details-img" :src="currStation.imgUrl" />
    <section v-if="currStation" class="station-details-info">
      <h2 class="title">{{ currStation.name }}</h2>
      <h4 class="tags">Genres: {{ getTags }}</h4>
      <h4>
        Station Author: <span>{{ currStation.createdBy.fullname }}</span>
      </h4>
      <h4>Listeners: 14,532</h4>
    </section>
    <song-list-options
      @search="search"
      @opened="opened"
      @removeStation="removeStation"
      @stationLiked="stationLiked"
    />
    <section class="station-list-container" :class="{ open: isOpen }">
      <song-list :songs="currStation.songs" />
    </section>
  </section>
</template>

<script>
import { youtubeService } from "@/services/youtube-service.js";
import songListOptions from "@/cmps/song-list-options.vue";
import songList from "@/cmps/song-list";
import chat from "@/cmps/chat";
import { socketService } from "@/services/socket-service.js";
// import { wrapGrid } from 'animate-css-grid'
export default {
  async created() {
    socketService.on("station updated", this.updateStation);
    const { stationId } = this.$route.params;
    try {
      await this.$store.dispatch({ type: "currStation", stationId });
      socketService.emit("station watch", stationId);
    } catch (err) {
      console.log("Error on curr station dispatch =>", err);
    }
  },
  data() {
    return {
      isSearch: false,
      isOpen: false,
      mainColor: null,
      likedStations: [],
    };
  },

  computed: {
    stationId() {
      return this.$route.params.stationId;
    },
    getTags() {
      return this.currStation.tags.join(",");
    },
    currStation() {
      return this.$store.getters.currStation;
    },
    mainImg() {
      return this.$store.getters.currStation.imgUrl;
    },
    getMainColor() {
      return this.mainColor;
    },
  },

  methods: {
    async search(query) {
      try {
        const res = await youtubeService.query(query);
        console.log(res.items[0].snippet.thumbnails);
        res.items.map((item) => {
          console.log("video id:", item.id.videoId);
          console.log("video snippet:", item.snippet.title);
          console.log("video thumbnail:", item.snippet.thumbnails.default.url);
          console.log("video publishedAt:", item.snippet.publishedAt);
        });
      } catch (err) {
        console.log("Error on YouTube query =>", err);
      }
    },
    async removeStation() {
      const { stationId } = this.$route.params;
      let userMsg = {};
      try {
        await this.$store.dispatch({ type: "removeStation", stationId });
        this.$store.commit({ type: "clearCurrSong" });
        userMsg = {
          txt: "Station Removed",
          type: "success",
        };
        this.$router.push("/");
      } catch (err) {
        userMsg = {
          txt: "Removing station failed",
          type: "error",
        };
      } finally {
        this.$store.commit({ type: "updateUserMsg", userMsg });
        setTimeout(() => {
          this.$store.commit({ type: "deleteMsg" });
        }, 2000);
      }
    },
    opened() {
      this.isOpen = !this.isOpen;
    },
    stationLiked(station) {
      const idx = this.likedStations.findIndex((s) => s._id === station._id);
      if (idx < 0) this.likedStations.push(station);
      else this.likedStations.splice(idx, 1);
      console.log(this.likedStations);
    },
    updateStation(updatedStation) {
      console.log(updatedStation, "555");
      this.$store.commit({
        type: "setCurrStation",
        currStation: updatedStation,
      });
    },
  },
  components: {
    songList,
    chat,
    songListOptions,
  },
};
</script>
