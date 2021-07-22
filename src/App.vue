<template>
  <div id="app" class="main-layout">
    <template>
      <app-header />
      <user-msg />
      <router-view />
      <section class="player-container" v-if="currSong">
        <player-img />
        <player :key="this.$store.getters.currSongId" />
      </section>
    </template>
    <!-- <app-footer /> -->
  </div>
</template>

<script>
import appHeader from "@/cmps/app-header";
// import appFooter from "@/cmps/app-footer";
import playerImg from "@/cmps/player-img";
import player from "@/cmps/player";
import userMsg from "@/cmps/user-msg";
export default {
  components: {
    appHeader,
    // appFooter,
    playerImg,
    player,
    userMsg,
  },
  async created() {
    const data = await this.$store.dispatch({ type: "loadStations" });
    this.$store.commit({ type: "setTags", tags: data.tags });
  },
  computed: {
    currSong() {
      return this.$store.getters.currSong;
    },
  },
  methods: {
    checkAppReady() {
      const poller = setInterval(() => {
        if (document.readyState === "complete") {
          clearInterval(poller);
          console.log("not ready");
          return document.readyState;
        }
        return document.readyState;
      }, 1000);
      return document.readyState;
    },
  },
 
};
</script>


