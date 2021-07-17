<template>
  <section class="songs-list-container">
    <ul class="songs-list">
      <draggable
        v-model="mySongs"
        @start="drag = true"
        @end="drag = false"
         group='songs'
      >
        <li v-for="(song, idx) in mySongs" :key="song._id">
          <song-preview :song="song" :idx="idx" />
        </li>
      </draggable>
    </ul>
  </section>
</template>

<script>
//"Sortable" npm. not sure i need it...

//name: songs
//pull: false
//put: true
import songPreview from "@/cmps/song-preview";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      stationId: this.$route.params.stationId,
    };
  },
  props: {
    // songs: {
    //   type: Array,
    //   required: false,
    //   default: null,
    // },
    // list: {
    //   type: Array,
    //   required: false,
    //   default: null,
    // },
  },
  components: {
    songPreview,
    draggable,
  },
  computed: {
    mySongs: {
      get() {
        console.log("get");
        return this.$store.getters.currStation.songs;
      },
      set(list) {
        console.log("set", list);
        this.$store.dispatch({
          type: "setListOrder",
          list,
          stationId: this.stationId,
        });
        // this.$store.commit({type: "setListOrder", list})
      },
    },
  },
  created() {
    // console.log('this.songs:', Array.isArray(this.songs))
  },
};
</script>

<style>
</style>