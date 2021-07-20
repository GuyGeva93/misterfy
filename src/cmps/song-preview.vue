<template>
  <section class="song-preview">
    <svg
      class="song-preview-play-btn"
      @click.stop="play(song.id)"
      width="30px"
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="play-circle"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"
      ></path>
    </svg>
    <h3>{{ idx + 1 }}</h3>
    <img class="thumbnail" :src="song.imgUrl" />
    <h3 class="song-title">{{ song.title }}</h3>
    <h3>{{song.duration}}</h3>
    <!-- <h3>352,587</h3> -->
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
    };
  },
  methods: {
    play(songId) {
      this.$store.commit({ type: "loadSongToPlayer", songId });
      this.$store.commit({ type: "setCurrSong", songId });
      // eventBusService.$emit("playSong")
      this.isPlaying = true;
    },
    toggleRemove() {
      this.isRemove = !this.isRemove;
    },
    removeSong(songId) {
      this.$store.dispatch({ type: "removeSong", songId });
    },
  },
};
</script>

<style>
</style>