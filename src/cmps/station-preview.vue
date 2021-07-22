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
				<span class="creator-name">{{ station.createdBy.fullname }}</span>
			</h3>
			<div class="station-likes-count">
				<img class="card-like-count-heart" src="../assets/icons/like.png" />
				<!-- <span class="card-like-count">test</span> -->
				<span class="card-like-count">{{likesCount}}</span>
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
				// "img": `url(${this.station.imgUrl})`,
				// "background-image": `url(${this.station.imgUrl})`,
				"background-repeat": "no-repeat",
				"background-size": "cover",
			};
			return style;
		},
		likesCount() {
			console.log(this.station.likedByUsers.length)
			return this.station.likedByUsers.length
		}
	},

};
</script>
