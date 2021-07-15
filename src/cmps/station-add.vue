<template>
  <section class="station-add">
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
        v-model="newStation.tags"
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
    createStation() {
      stationService.save(this.newStation);
      // console.log("this.newStation", this.newStation);
      this.$emit("closeModal");
      this.$router.push(`/details/${this.newStation._id}`);
    },
  },
};
</script>
