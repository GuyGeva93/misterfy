<template>
  <section class="station-details" v-if="station">
    <chat :stationId="stationId" class="section-details-chat" />
    <section class="station-details-img">
      <img
        src="https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6a/e4/59/6ae45956-8b3d-0ff2-81f8-587c7c65b515/source/256x256bb.jpg"
      />
    </section>
    <section class="station-details-info">
      <!-- <h2>{{ station._id }}</h2> -->
     <h3>Title: {{ station.name }}</h3>
      <h4>Tags: {{getTags}}</h4>
    </section>
    <section class="station-list-container">
    <song-list-options class="song-list-options"/>
    <song-list :songs="station.songs" class="song-list-container"/>
    </section>
  </section>
</template>

<script>
import { stationService } from "@/services/station-service.js";
import songListOptions from "@/cmps/song-list-options.vue";

import songList from "@/cmps/song-list";
import chat from "@/cmps/chat";
export default {
  async created() {
    const { stationId } = this.$route.params;
    this.station = await stationService.getById(stationId);
  },
  data() {
    return {
      station: null,
      isSearch: false,
    };
  },

  computed: {
    stationId() {
      return this.$route.params.stationId;
    },
    getTags(){
      return this.station.tags.join(',')
    }
  },

  methods: {
    addSong() {},
  },

  components: {
    songList,
    chat,
    songListOptions,
  },
};
</script>
