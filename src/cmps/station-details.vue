<template>
  <section class="station-details">
    <aside class="station-details-chat">
      <span>This is chat</span>
    </aside>
    <section class="station-details-conatiner">
      <img
        src="https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6a/e4/59/6ae45956-8b3d-0ff2-81f8-587c7c65b515/source/256x256bb.jpg"
      />
      <section class="station-details-info" v-if="station">
        <h2>{{station._id}}</h2>
        <h3>{{station.name}}</h3>
        <h4>*Station tags*</h4>
      </section>
    </section>
  </section>
</template>

<script>
import { stationService } from '@/services/station-service.js'
export default {
  async created() {
    const { stationId } = this.$route.params
    this.station = await stationService.getById(stationId)
    console.log('station', this.station)
  },

  data() {
    return {
      station: null,
    }
  },

  computed: {
    stationId() {
      return this.$route.params.stationId
    },
  },
}
</script>
