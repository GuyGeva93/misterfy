<template>
  <section class="station-add">
    <button class="close" @click="closeModal">✖</button>
    <form @submit.prevent="createStation">
      <input type="file" />
      <input type="text" placeholder="Station name" v-model="newStation.name" />
      <input
        type="text"
        placeholder="Station description"
        v-model="newStation.description"
      />
      <input
        type="text"
        placeholder="Station genre"
        v-model="newStation.tags[0]"
      />
      <button>Add</button>
    </form>
  </section>
</template>
<script>
import { stationService } from "@/services/station-service.js";
export default {
  created() {
    this.newStation = stationService.getEmptyStation();
  },
  data() {
    return {
      newStation: {},
    };
  },
  methods: {
    async createStation() {
      await stationService.save(this.newStation);
      // console.log("this.newStation", this.newStation);
      this.$emit("closeModal");
      this.$router.push(`/details/${this.newStation._id}`);
    },
    closeModal(){
      this.$emit("closeModal");
    }
  },
};
</script>
