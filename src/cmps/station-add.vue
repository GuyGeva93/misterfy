<template>
  <section class="station-add">
    <button class="close" @click="closeModal">X</button>
    <h2>Create your new station</h2>
    <form @submit.prevent="createStation">
     <label class="choose-file">
       <div>Choose image</div>
        <input type="file" @change="handleImg" />
     </label>
      <input type="url" placeholder="url of an image" v-model="imgUrl" />
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
     <template v-if="imgLoaded">
        <button>Add</button>
     </template>
     <h2 v-else>Image is being loaded...</h2>
    </form>
  </section>
</template>
<script>
import { stationService } from "@/services/station-service.js";
import { uploadImg } from "@/services/img-upload-service.js";
export default {
  created() {
    this.newStation = stationService.getEmptyStation();
  },
  data() {
    return {
      imgUrl: "",
      imgLoaded:true,
      newStation: {},
    };
  },
  methods: {
    async handleImg(ev) {
      const file = ev.target.files[0];
      // this.imgLoaded = false;
      try {
        this.imgLoaded=false;
        const savedImg = await uploadImg(file);
        this.newStation.imgUrl = savedImg.url;
        this.imgLoaded=true;
      } catch (error) {
        console.log(error);
      }
    },
    async createStation() {
      if (!this.newStation.imgUrl && this.imgUrl) {
        this.newStation.imgUrl = this.imgUrl;
      }
      this.newStation=await this.$store.dispatch({type:'saveStation',station:this.newStation});
      this.$emit("closeModal");
      this.$router.push(`/details/${this.newStation._id}`);
    },
    closeModal(){
      this.$emit("closeModal");
    }
  },
};
</script>
