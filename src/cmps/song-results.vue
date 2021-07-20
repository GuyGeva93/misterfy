<template>
	<section v-if="results" class="song-results">
		<draggable v-model="myList">
			<div
				v-for="song in results"
				:key="song.id.videoId"
				@end="addSong(this.song)"
				group="songs"
			>
				<div
					class="search-result"
					@click.stop="addSong(song)"
					@mousedown="getCurrSong(song)"
				>
					{{ song.snippet.title }}
				</div>
			</div>
		</draggable>
	</section>
</template>

<script>
import draggable from "vuedraggable"
import { youtubeService } from '@/services/youtube-service.js'

export default {
	components: {
		draggable,
	},
	props: {
		results: {
			type: Array,
		},
	},
	data() {
		return {
			song: ''
		}
	},
	computed: {
		myList: {
			get() {
				return this.$store.state.stationStore.currStation.songs;
			},
			set(clone) {
				console.log(clone)
				this.addSong(this.song)
			},
		},
	},
	methods: {
		async addSong(song) {
			const { stationId } = this.$route.params
			const duration = await youtubeService.getDuration(song.id.videoId)
			console.log('duration', duration)
			this.$store.dispatch({ type: "addSong", song, stationId })
		},
		getCurrSong(song) {
			this.song = song
		}
	},
	mounted() {
	},
};
</script>
