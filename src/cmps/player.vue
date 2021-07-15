<template>
  <section class="player">
    <!-- <vue-plyr id="player" ref="plyr">
      <audio  controls crossorigin playsinline autoplay="false">
        <source src="https://www.youtube.com/embed/r9JTtQOyZVo" type="audio/mp3" />
      </audio>
    </vue-plyr> -->
    <vue-plyr>
  <div  ref="plyr" data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY" ></div>
</vue-plyr>
  </section>
</template>

<script>

export default {
  data() {
    return {
      // player: "",
      // done: false,
      // tag: "",
    };
  },
  mounted() {

    // //   TODO: fetch media
    // //   TODO: figure out how to use autoplay and when to turn it to true
    // this.$refs.plyr.player.on("event", () => console.log("event fired"));
    // // console.log(this.$refs.plyr.player.elements.controls);
    // // this.$refs.plyr.player.on("ready", (event) => {
    //   // const instance = event.detail.plyr;
    //   // console.log(instance);
    // // });
    // this.$refs.plyr.player.on("play", () => {
    //   console.log("pressed play");

    //   //   const instance = event.detail.plyr;
    //   //   console.log(instance);
    // });
    // this.$refs.plyr.player.on("pause", () => {
    //   console.log("pressed pause");
    // });
    // this.$refs.plyr.player.on("volumechange", () => {
    //   console.log("changed volume");
    // });
    // this.$refs.plyr.player.on("ratechange", () => {
    //   console.log("changed playback speed");
    // });
  },
  created() {
    
  },
  methods: {
   
  },
};
</script>

<style>
</style>