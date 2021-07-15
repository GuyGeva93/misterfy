<template>
  <section class="station-details" v-if="station">
    <aside class="station-details-chat">
     <chat/>
    </aside>
    <section class="station-details-conatiner">
      <img
        src="https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6a/e4/59/6ae45956-8b3d-0ff2-81f8-587c7c65b515/source/256x256bb.jpg"
      />
      <section class="station-details-info">
        <h2>{{ station._id }}</h2>
        <h3>{{ station.name }}</h3>
        <section class="station-tags-container">
          <h4 v-for="(tag, idx) in station.tags" class="tag" :key="idx">
            {{ tag }}
          </h4>
        </section>
        <section class="station-songs-container">
          <song-list :songs="station.songs" />
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { stationService } from "@/services/station-service.js";

import songList from "@/cmps/song-list";
import chat from '@/cmps/chat';
export default {
  async created() {
    const { stationId } = this.$route.params;
    this.station = await stationService.getById(stationId);
  },
  data() {
    return {
      station: null,
    };
  },

  computed: {
    stationId() {
      return this.$route.params.stationId;
    },
  },

  methods: {
    addSong() {
      
    }
  },


  components: {
    songList,
    chat
  },
};
</script>
