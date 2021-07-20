<template>
  <main class="explore-container">
    <section class="explore">
      <ul class="tags-list">
        <!-- <li class="tag-preview">
          <router-link :to="'/explore/' + this.name" >All</router-link>
        </li> -->
        <li v-for="(tag, idx) in tags" :key="idx" class="tag-preview">
          <router-link :to="getUrl(tag)">
            <station-tag :tag="tag" />
          </router-link>
        </li>
      </ul>
    </section>
    <template v-if="!isLoading">
      <section v-if="stations">
        <station-list :stations="stations" />
      </section>
      <h2 v-else>No stations found</h2>
    </template>
    <h2 v-else>Loading...</h2>
  </main>
</template>

<script>
import stationList from "@/cmps/station-list";
import stationTag from "@/cmps/station-tag";
export default {
  created() {},
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    getUrl(tag) {
      let url = "/explore/";

      if (this.name) {
        url += this.name;
      } else url += "*";
      if (tag === "All") tag = "";
      url += "/" + tag;

      return url;
    },
    // getStationsByTag(tag){
    //   return this.stations.filter(station=>{
    //     return
    //   })
    // }
  },
  computed: {
    name() {
      return this.$route.params.name;
    },
    stations() {
      return this.$store.getters.stationsToDisplay;
    },
    tags() {
      // console.log(this.$store.getters.tags);
      const tags= this.$store.getters.tags;
      return['All',...tags];
    },
    
  },
  components: {
    stationList,
    stationTag,
  },
  watch: {
    "$route.params": {
      immediate: true,
      async handler() {
        const { name, tag = "" } = this.$route.params;
        const filterBy = {
          name,
          tag,
        };
        if (!name || name === "*") filterBy.name = "";
        try {
          this.$store.commit({ type: "setFilter", filterBy });
          await this.$store.dispatch({ type: "loadStations" });
        } catch (err) {
          console.log("Error on set filter =>", err);
        }
      },
    },
 destroyed () {
   this.$route.push('/explore');
 },
  },
};
</script>
