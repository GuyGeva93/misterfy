<template>
  <section @mouseover="isHover=true" @mouseleave="isHover=false" class="song-preview">
    <span v-if="isHover">
    <img v-if="!isRunning||!isPlaying" @click.stop="play(song.id)" class="song-preview-play-btn" src="../assets/icons/play-button-triangle.png">
    <img v-if="isRunning&&isPlaying" @click.stop="pause(song.id)" class="song-preview-pause-btn" src="../assets/icons/pause-lines.png">
    </span>
    <h3 v-else>{{ idx + 1 }}</h3>
    <img class="thumbnail" :src="song.imgUrl" />
    <h3 class="song-title">{{ song.title }}</h3>
    <!-- <h3>{{song}}</h3> -->
    <button class="like-song">🤍</button>
    <img
      @click="toggleRemove"
      class="details-btn"
      src="@/assets/icons/ellipsis.png"
    />
	<transition name="slide-in">
    <svg v-if="isRemove"
      width="20px"
      class="song-preview-remove-btn"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="trash-alt"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      @click.stop="removeSong(song.id)"
    >
      <path
        d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
      ></path>
    </svg>
	</transition>
  </section>
</template>

<script>
// import { eventBusService } from '@/services/eventBus-service.js'
export default {
  props: {
    song: {
      type: Object,
    },
    idx: {
      type: Number,
    },
  },
  data() {
    return {
      isPlaying: false,
      isRemove: false,
      isHover: false
    };
  },
  computed: {
    isRunning() {
      return this.$store.getters.isPlaying
    }
  },
  methods: {
    play(songId) {
      this.$store.commit({ type: "loadSongToPlayer", songId });
      this.$store.commit({ type: "setCurrSong", songId });
      // eventBusService.$emit("playSong")
      this.isPlaying = true;
    },
    pause(songId){
      console.log('pause', songId);
    },
    toggleRemove() {
      this.isRemove = !this.isRemove;
    },
    removeSong(songId) {
      this.$store.dispatch({ type: "removeSong", songId });
    },
  },
  mounted () {
  },
};
</script>

<style>
</style>