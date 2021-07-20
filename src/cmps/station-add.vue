<template>
  <section class="station-add">
    <button class="close" @click="closeModal">X</button>
    <h2>Create your new station</h2>
    <form @submit.prevent="createStation">
      <label class="choose-file">
        <svg
          width="70px"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="cloud-upload-alt"
          class="svg-inline--fa fa-cloud-upload-alt fa-w-20"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
          ></path>
        </svg>
        <span> Upload file</span>
        <input type="file" @change="handleImg" />
      </label>
      <input type="url" placeholder="Image URL" v-model="imgUrl" />
      <input
        type="text"
        placeholder="Name"
        v-model="newStation.name"
        required
      />
      <input
        type="text"
        placeholder="Description"
        v-model="newStation.description"
      />
      <!-- <input type="text" placeholder="Genre" v-model="newStation.tags[0]" /> -->
      <input
        type="text"
        v-model="selectedTag"
        list="tags"
        @change="tagsShow"
        placeholder="Genre"
        required
      />
      <datalist id="tags">
        <option v-for="tag in tags" :key="tag">{{ tag }}</option>
      </datalist>
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

    if (!this.currUserId) {
      this.$store.commit({ type: "setUserId" });
    }
  },
  data() {
    return {
      imgUrl: "",
      imgLoaded: true,
      newStation: {},
      selectedTag: "",
    };
  },
  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    currUserId() {
      return this.$store.getters.currUserId;
    },
  },
  methods: {
    async handleImg(ev) {
      const file = ev.target.files[0];
      try {
        this.imgLoaded = false;
        const savedImg = await uploadImg(file);
        this.newStation.imgUrl = savedImg.url;
        this.imgLoaded = true;
      } catch (err) {
        console.log("Error on handle img =>", err);
      }
    },
    async createStation() {
      if (!this.newStation.imgUrl && this.imgUrl) {
        this.newStation.imgUrl = this.imgUrl;
      }
      if (this.selectedTag) {
        this.newStation.tags.push(this.selectedTag);
      }
      this.newStation.createdBy = {
        id: this.currUserId,
        fullname: "guest" + this.currUserId,
      };

      let userMsg = {};
      try {
       
        this.newStation = await this.$store.dispatch({
          type: "saveStation",
          station: this.newStation,
        });
        //  debugger
        userMsg = {
          txt: "Station has been successfully added!",
          type: "success",
        };
        this.$emit("closeModal");
        this.$router.push(`/details/${this.newStation._id}`);
      } catch (err) {
        console.log("Error on save station =>", err);
        userMsg = {
          txt: "Adding the station has been failed!",
          type: "error",
        };
      } finally {
        this.$store.commit({ type: "updateUserMsg", userMsg });
        setTimeout(() => {
          this.$store.commit({ type: "deleteMsg" });
        }, 2000);
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
    tagsShow() {
      console.log(this.newStation.tags);
    },
  },
};
</script>
