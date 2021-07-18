<template>
	<section class="player-img" v-if="currSongImg">
		<img :src="currSongImg" />
	</section>
</template>
<script>
export default {

	computed: {
		currSongImg() {
			const currSong = this.$store.getters.currSong
			const { imgUrl } = currSong
			return imgUrl
		},
	},

}
</script>