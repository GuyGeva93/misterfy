<template>
	<section class="player-img" v-if="songId">
		<!-- <img :src="imgAlbum" /> -->
		<img
			src="https://lh3.googleusercontent.com/xAXXzsCrnVM2GAQUEWVs_s4Sf0-XZn10ar8u22IZP0qjzp5juu9AEupV4jGhQPf9YxktSt6xForIZj7efIKEFzfRng=w128-h128-e365-rj-sc0x00ffffff"
		/>
	</section>
</template>
			<!--src="https://lh3.googleusercontent.com/xAXXzsCrnVM2GAQUEWVs_s4Sf0-XZn10ar8u22IZP0qjzp5juu9AEupV4jGhQPf9YxktSt6xForIZj7efIKEFzfRng=w128-h128-e365-rj-sc0x00ffffff" -->
<script>
export default {

	computed: {
		songId() {
			return this.$store.getters.currSongId
		},
	},

}
</script>