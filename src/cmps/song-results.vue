<template>
  <section class="song-results">
      <draggable v-model='myList'>
    <div v-for="song in results" :key="song.id.videoId">
      <div @click.stop="addSong(song)">{{ song.snippet.title }}</div>
    </div>
      </draggable>
  </section>
</template>

<script>
  import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  props: {
    results: {
      type: Array,
    },
  },
  computed: {
    // myList: {
    //     get() {
    //       // console.log(this.$store.state.stationStore.currStation.songs);
    //         return this.$store.state.stationStore.currStation.songs
    //     },
    //     set(value) {
    //         this.$store.commit('setCurrStation', value)
    //     }
    // }
  },
  methods: {
    addSong(song) {
      const {stationId} = this.$route.params;
      this.$store.dispatch({ type: "addSong", song, stationId });
      
    },
  },
};
</script>
