<template>
  <section class="song-preview-container">
    <h3 v-if="!isPlaying">{{ idx + 1 }}</h3>
    <!-- <div v-else class="block">
      <div class="centre">
        <ul class="bars active">
          <li class="bar1"></li>
          <li class="bar2"></li>
          <li class="bar3"></li>
          <li class="bar4"></li>
          <li class="bar5"></li>
          <li class="hidden"></li>
        </ul>
      </div>
    </div> -->
    <img :src="song.imgUrl" />
    <h3>{{ song.title }}</h3>
    <h3>352,587</h3>
    <button class="like-song">🤍</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false
    }
  },
  props: {
    song: {
      type: Object,
    },
    idx: {
      type: Number,
    },
  },
};
</script>

<style>
</style>