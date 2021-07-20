<template>
	<section class="songs-list-container">
		<div class="song-list-headers">
			<span></span>
			<span>#</span>
			<span>Title</span>
			<span>Duration</span>
		</div>
		<ul class="songs-list">
			<draggable
				v-model="mySongs"
				@start="drag = true"
				@end="drag = false"
				group="songs"
			>
				<li v-for="(song, idx) in mySongs" :key="song._id">
					<song-preview :song="song" :idx="idx" />
				</li>
			</draggable>
		</ul>
	</section>
</template>

<script>
import songPreview from "@/cmps/song-preview";
import draggable from "vuedraggable";
export default {
	data() {
		return {
			stationId: this.$route.params.stationId,
		};
	},
	components: {
		songPreview,
		draggable,
	},
	computed: {
		mySongs: {
			get() {
				return this.$store.getters.currStation.songs
			},
			set(list) {
				this.$store.dispatch({ type: "setListOrder", list, stationId: this.stationId });

			},
		},
	},
};
</script>

<style>
</style>