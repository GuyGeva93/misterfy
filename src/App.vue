<template>
	<div id="app" class="main-layout">
		<!-- <div class="header-filler main-layout" ></div> -->
		<app-header />
		<router-view />
		<section class="player-container" v-if="currSong">
			<player-img />
			<player :key="this.$store.getters.currSongId" />
		</section>
		<!-- <div class="player-filler"></div> -->
		<!-- <app-footer /> -->
	</div>
</template>

<script>
import appHeader from "@/cmps/app-header";
// import appFooter from "@/cmps/app-footer";
import playerImg from '@/cmps/player-img'
import player from '@/cmps/player'
// import songInfoSlider from '@/cmps/song-info-slider.vue'
export default {
	components: {
		appHeader,
		// appFooter,
		// songInfoSlider,
		playerImg,
		player,

	},
	created() {
		this.$store.dispatch({ type: 'loadStations' });
	},
	computed: {
		currSong() {
			console.log(this.$store.getters.currSong)
			return this.$store.getters.currSong 
		}
	},

}
</script>


