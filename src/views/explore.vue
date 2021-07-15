<template>
  <main class="explore-container">
    <section class="explore ">
      <ul class="tags-list">
        <li class="tag-preview">
          <router-link :to="'/explore/'+this.query">All</router-link>
        </li>
        <li v-for="(tag, idx) in tags" :key="idx" class="tag-preview">
         <router-link :to="getUrl(tag)"> {{ tag }}</router-link>
        </li>
      </ul>
    </section>
    <section v-if="stations">
       <station-list :stations="stations"/>
    </section>
  </main>
</template>

<script>
import stationList from '@/cmps/station-list';
export default {
  created() {
 const tags=new Set();
 console.log(this.stations);
 this.stations.map(station => {
   tags.add(...station.tags);
 console.log(...tags,'1');
 });
  },
  data() {
    return {
      tags: [
        "Easy",
        "Pop",
        "Punk",
        "Israeli",
        "hip-hop",
        "electronic",
        "latin",
        "classic",
        "blues",
        "disco",
      ],
    };
  },
  methods:{
getUrl(tag){
  let url='/explore/';

   if (this.query) {
      url+=this.query;
   }
   else url+='*';
 url+='/'+tag;


  return url;
}
  },
  computed: {
    query() {
      return this.$route.params.query;
    },
    stations(){
     return this.$store.getters.stationsToDisplay;
    }
   
  },
  components:{
    stationList
  }
};
</script>
