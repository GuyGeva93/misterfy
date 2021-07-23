<template>
  <header>
    <div v-if="isCreating" class="screen-cover"></div>
    <span class="logo" @click="goHome">
      <img class="logo-img" src="../assets/logo/logo-no-txt.png" alt="" />
      <img class="logo-txt" src="../assets/logo/logo-txt.png" />
    </span>
    <filter-text-search @search="search" />
    <h2 v-if="loggedinUser">Hello, {{ loggedinUser.fullname }}</h2>
    <div class="hamburger" @click="toggleNavEntry">
      <svg
        height="32px"
        id="Layer_1"
        style="enable-background: new 0 0 32 32"
        version="1.1"
        viewBox="0 0 32 32"
        width="32px"
        xml:space="preserve"
      >
        <path
          d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
        />
      </svg>
    </div>
    <nav class="main-nav" :class="{ 'nav-open': isNavBurgerOpen }">
      <button class="creatify-btn nav-link" @click.stop="toggleCreating">
        Creatify
      </button>
      <span class="sep">|</span>
      <router-link class="nav-link" to="/explore" @click.native="scrollTop" >Explore</router-link
      ><span class="sep">|</span> <router-link class="nav-link" to="/about">About</router-link><span class="sep">|</span>
      <template v-if="!loggedinUser">
        <router-link  to="/signup">Signup</router-link></template
      >
      <template v-else
        ><button class="logout-btn " @click="logout" >Logout</button></template
      >
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
      // 1080px or lower
      isNavBurgerOpen: false,
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
    goHome() {
      this.$router.push("/");
      window.scrollTo(0, 0);
    },
    search(name) {
      //Preventing duplicated route error
      const currName = this.$route.params.name;
      if (currName && currName === name) return;
      if (!name) name = "*";
      let url = "/explore/" + name;
      if (this.tag) url += "/" + this.tag;

      this.$router.push(url).catch((err) => {
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
    async logout() {
      await this.$store.dispatch({ type: "logout" });
    },
    toggleNavEntry() {
      this.isNavBurgerOpen = !this.isNavBurgerOpen;
    },
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },

  components: {
    filterTextSearch,
    stationAdd,
  },
};
</script>
