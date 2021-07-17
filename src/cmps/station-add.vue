<template>
	<section class="station-add">
		<button class="close" @click="closeModal">X</button>
		<h2>Create your new station</h2>
		<form @submit.prevent="createStation">
			<label class="choose-file">
				<div>
					<img
						src="https://images.squarespace-cdn.com/content/v1/504fafcf84ae1835d7e5c807/1481053836481-1P6LXZV7W56MFQ3XTRYF/upload-arrow_318-26670.jpg?format=750w"
					/>
				</div>
				<input type="file" @change="handleImg" />
			</label>
			<input type="url" placeholder="Image URL" v-model="imgUrl" />
			<input type="text" placeholder="Name" v-model="newStation.name" />
			<input
				type="text"
				placeholder="Description"
				v-model="newStation.description"
			/>
			<!-- <input type="text" placeholder="Genre" v-model="newStation.tags[0]" /> -->
			<input type="text" v-model="newStation.tags" list="tags" @change="tagsShow"/>
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
		this.newStation = stationService.getEmptyStation()
		this.tags = this.$store.getters.tags
		console.log('this.tags', this.tags)
	},
	data() {
		return {
			imgUrl: "",
			imgLoaded: true,
			newStation: {},
			tags: null
		};
	},
	methods: {
		async handleImg(ev) {
			const file = ev.target.files[0]
			// this.imgLoaded = false;
			try {
				this.imgLoaded = false;
				const savedImg = await uploadImg(file);
				this.newStation.imgUrl = savedImg.url;
				this.imgLoaded = true;
			} catch (error) {
				console.log(error);
			}
		},
		async createStation() {
			if (!this.newStation.imgUrl && this.imgUrl) {
				this.newStation.imgUrl = this.imgUrl;
			}
			this.newStation = await this.$store.dispatch({ type: 'saveStation', station: this.newStation });
			this.$emit("closeModal");
			this.$router.push(`/details/${this.newStation._id}`);
		},
		closeModal() {
			this.$emit("closeModal");
		},
    tagsShow(){
      console.log(this.newStation.tags)
    }
	},
};
</script>
