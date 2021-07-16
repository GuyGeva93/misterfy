<template>
  <section class="player" v-if="songId" >
    <vue-plyr>
      <div class="plyr__video-embed" id="player">
        <iframe
          :src="src"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        ></iframe>
      </div>
      <!-- <div
        ref="plyr"
        data-plyr-provider="youtube"
        :data-plyr-embed-id="songId"
      ></div> -->
    </vue-plyr>
  </section>
</template>

<script>

export default {
  // created() {
  //   console.log(this.$store.getters.currSongId)
  // },
  data() {
    return {
      // currSongId: ''
      // bTqVqk7FSmY
    }
  },

  computed: {
    songId() {
      return this.$store.getters.currSongId
    },
    src() {
      return `https://www.youtube.com/embed/${this.songId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`
    }
  },

};
</script>

<style>
</style>