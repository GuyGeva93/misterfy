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
      <section v-if="filteredStations" class="explore-station-list">
        <div v-for="station in filteredStations" :key="station._id">
          <station-preview :station="station" />
        </div>
      </section>
      <h2 v-else>No stations found</h2>
    </template>
    <h2 v-else>Loading...</h2>
  </main>
</template>

<script>
// import stationList from "@/cmps/station-list";
import stationPreview from "@/cmps/station-preview";
import stationTag from "@/cmps/station-tag";
export default {
  created() {
    if(this.name||this.tag)
    this.$router.push("/explore").catch((err) => {
        //When same route appears
        if (err.name != "NavigationDuplicated") {
          throw err;
        }
      });
  },
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
      return this.$store.getters.allStations;
    },
    filteredStations(){
      return this.$store.getters.stationsToDisplay
    },
    tags() {
      // console.log(this.$store.getters.tags);
      const tags = this.$store.getters.tags;
      return ["All", ...tags];
    },
    filterTitle(){
      let {name,tag}=this.$route.params;
      if(!name||name==='*')if(!tag)name='All';
      else name='';
      if(!tag){
        if(name==='All')tag='';
        else tag='All';
      }
      name+=' ';
      // return tag;
      return name+tag;
    },
    noFilter(){
          const {name,tag}=this.$route.params;
          return (!name||name==='*') && !tag
    }
  },

  components: {
    // stationList,
    stationTag,
    stationPreview,
  },
  watch: {
    "$route.params": {
      immediate: true,
      async handler() {
        const { name, tag = "" } = this.$route.params;
        if(!name)return;
        const filterBy = {
          name,
          tag,
        };
        if (!name || name === "*") filterBy.name = "";
        try {
          this.$store.commit({ type: "setFilter", filterBy });
          await this.$store.dispatch({ type: "loadStations" });
          console.log('now?');
        } catch (err) {
          console.log("Error on set filter =>", err);
        }
      },
    },
  },
};
</script>
