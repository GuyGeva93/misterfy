<template>
	<section class="station-details" v-if="currStation">
		<chat :stationId="stationId" class="section-details-chat" />
		<img ref="img" class="station-details-img" :src="currStation.imgUrl" />
		<section v-if="getStation" class="station-details-info">
			<h2 class="title">{{ currStation.name }}</h2>
			<h4 class="tags">Generes: {{ getTags }}</h4>
			<h4>
				Station Author: <span>{{ currStation.createdBy.fullname }}</span>
			</h4>
			<h4>Listeners: 14,532</h4>
		</section>
		<song-list-options
			@search="search"
			@opened="opened"
			@removeStation="removeStation"
		/>
		<!-- <button @click.stop="nextSong">Next</button>
    <button @click.stop="prevSong">Prev</button> -->
		<section class="station-list-container" :class="{ open: isOpen }">
			<song-list :songs="currStation.songs" />
		</section>
	</section>
</template>

<script>
import { youtubeService } from "@/services/youtube-service.js";
import songListOptions from "@/cmps/song-list-options.vue";
import songList from "@/cmps/song-list";
import chat from "@/cmps/chat";
export default {
	async created() {
		const { stationId } = this.$route.params
		try {
			await this.$store.dispatch({ type: "currStation", stationId })
		} catch (err) {
			console.log('Error on curr station dispatch =>', err)
		}
	},
	data() {
		return {
			isSearch: false,
			isOpen: false,
			mainColor: null,
		};
	},

	computed: {
		stationId() {
			return this.$route.params.stationId
		},
		getStation() {
			return this.$store.getters.currStation
		},
		getTags() {
			console.log(this.$store.getters.currStation)
			return this.currStation.tags.join(",")
		},
		currStation() {
			return this.$store.getters.currStation
		},
		mainImg() {
			return this.$store.getters.currStation.imgUrl
		},
		getMainColor() {
			return this.mainColor
		},
	},

	methods: {
		async search(query) {
			try {
				const res = await youtubeService.query(query)
				res.items.map((item) => {
					console.log("video id:", item.id.videoId)
					console.log("video snippet:", item.snippet.title)
					console.log("video thumbnail:", item.snippet.thumbnails.default.url)
					console.log("video publishedAt:", item.snippet.publishedAt)
				})
			} catch (err) {
				console.log('Error on YouTube query =>', err)

			}
		},
		removeStation() {
			const { stationId } = this.$route.params
			this.$store.dispatch({ type: 'removeStation', stationId })
			this.$store.commit({ type: 'clearCurrSong' })
			this.$router.push('/')
		},
		opened() {
			this.isOpen = !this.isOpen
		},
	},
	components: {
		songList,
		chat,
		songListOptions,
	},
};
</script>
