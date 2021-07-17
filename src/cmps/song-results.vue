<template>
  <section v-if="results" class="song-results">
    <draggable v-model="myList">
      <div
        v-for="song in results"
        :key="song.id.videoId"
        @end="addSong(this.song)"
        group="songs"
      >
        <div class="search-result" @click.stop="addSong(song)"
        @mousedown="getCurrSong(song)">
          {{ song.snippet.title }}
        </div>
      </div>
    </draggable>
  </section>
</template>

<script>
//"Sortable" npm. not sure i need it...
// name: 'songs'
//revertClone
//put:false
// pull: 'clone'/ or maybe - function (addSong)?
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  props: {
    results: {
      type: Array,
    },
  },
  data() {
    return {
      song: ''
    }
  },
  computed: {
    myList: {
      get() {
        
        // console.log(this.$store.state.stationStore.currStation.songs);
        return this.$store.state.stationStore.currStation.songs;
      },
      set(clone) {
        console.log(clone);
        console.log(this.song);
        this.addSong(this.song);
      },
    },
  },
  methods: {
    addSong(song) {
      console.log(song);
      const { stationId } = this.$route.params;
      this.$store.dispatch({ type: "addSong", song, stationId });
    },
    getCurrSong(song){
      this.song = song
    }
  },
  mounted() {
  },
};
</script>
