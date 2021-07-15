<template>
  <div id="player"></div>
</template>

<script>
export default {
  data() {
    return {
      player: "",
      done: false,
      tag: "",
    };
  },
  created() {
      this.tag = document.createElement('script');
      this.tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(this.tag, firstScriptTag);
      
  },
  methods: {
     onYouTubeIframeAPIReady() {
        this.player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      },
      onPlayerReady(event) {
        event.target.playVideo();
      }
  },
};
</script>

<style>
</style>