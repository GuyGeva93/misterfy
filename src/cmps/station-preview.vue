<template>
	<section class="station-preview" v-if="station">
		<router-link :to="'/details/' + station._id">
			<div class="card-container">
				<div class="station-preview-card">
					<div class="station-preview-img-container">
						<img :src="station.imgUrl" />
					</div>
					<!-- :style="stationImg" -->
					<div class="first-song-preview-container">
						<img
							v-if="station.songs && station.songs.length"
							:src="station.songs[0].imgUrl"
							:alt="station.name"
						/>
					</div>
				</div>
			</div>

			<h2 class="station-preview-name">{{ station.name }}</h2>
			<h3 class="station-preview-creator">
				Created by
				<span class="creator-name">{{ station.createdBy.username }}</span>
			</h3>
			<div class="station-likes-count">
				<img class="card-like-count-heart" src="../assets/icons/like.png" />
				<span class="card-like-count">500</span>
				<!-- <span class="card-like-count">{{ likesCount }}</span> -->
			</div>
		</router-link>
	</section>
</template>

<script>
export default {
	props: {
		station: {
			type: Object,
		},
	},
	computed: {
		stationImg() {
			const style = {
				"background-repeat": "no-repeat",
				"background-size": "cover",
			};
			return style;
		},
		// likesCount() {
			// if (!this.station) return -1
			// this.nextTick(() => {
			// 	const length = this.station.likedByUsers.length
			// 	return length
			// })
			// return length
			// return this.station.likedByUsers.length
		// }
	},
	// methods: {
	// 	likesCount() {
	// 		if (!this.station.likedByUsers) this.currStation = 0
	// 		const length = this.station.likedByUsers.length
	// 		this.currStation = length
	// 	}
	// },
};
</script>
