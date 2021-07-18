<template>
	<div id="app" class="main-layout">
		<!-- <div class="header-filler main-layout" ></div> -->
		<app-header />
			<router-view />
		<player-img />
		<player :key="this.$store.getters.currSongId" />
		<!-- <div class="player-filler"></div> -->
		<!-- <app-footer /> -->
	</div>
</template>

<script>
import appHeader from "@/cmps/app-header";
// import appFooter from "@/cmps/app-footer";
import playerImg from '@/cmps/player-img'
import player from '@/cmps/player'
export default {
	components: {
		appHeader,
		// appFooter,
    playerImg,
		player,
		
	},
	created() {
		this.$store.dispatch({ type: 'loadStations' });
	},

}
</script>


