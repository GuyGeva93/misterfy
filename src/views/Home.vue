<template>
	<div class="home-page main-layout">
		<div v-show="!loaded" class="loader">
			<div class="loader__bar"></div>
			<div class="loader__bar"></div>
			<div class="loader__bar"></div>
			<div class="loader__bar"></div>
			<div class="loader__bar"></div>
			<div class="loader__ball"></div>
		</div>

		<h1 v-show="loaded" class="hero-txt">
			<span>LISTENING</span><span>IS</span><span>EVERYTHING</span>
		</h1>
		<div v-show="loaded" class="hero-arrows container">
			<div class="chevron"></div>
			<div class="chevron"></div>
			<div class="chevron"></div>
		</div>
		<div v-show="loaded" @click="scrollDown" class="scroll-down"></div>

		<div v-show="loaded" class="hero-img">
			<img src="@/assets/img/hero.png" @load="onImgLoad" />
		</div>
		<div ref="stationMain" v-show="loaded" class="station-main">
			<h2 class="top-picks">TOP PICKS</h2>
			<station-list
				class="top-picks-carousel"
				:stations="topPicks"
				v-if="topPicks"
			/>

			<h2 class="your-picks">My favorites</h2>
			<!-- <h2 class="your-picks">YOUR PICKS</h2> -->
			<station-list
				class="your-picks-carousel"
				:stations="yourPicks"
				v-if="yourPicks"
			/>

			<h2 class="recomended">RECOMENDED FOR YOU</h2>
			<station-list
				class="recomended-carousel"
				:stations="recomended"
				v-if="recomended"
			/>
		</div>
	</div>
</template>
<script>
import stationList from "@/cmps/station-list";
export default {
	name: "home",
	components: {
		stationList,
	},
	data() {
		return {
			loaded: false,
		};
	},
	computed: {
		stations() {
			const stations = this.$store.getters.stationsToDisplay;
			// console.log(stations)
			return stations;
		},
		topPicks() {
			return this.stations.slice(0, 6)
		},
		yourPicks() {
			let favoritesStations = []
			const user = this.$store.getters.loggedinUser
			if (!user || !user.likedStations) return this.stations.slice(6, 11)
			if (user.likedStations) {
				favoritesStations.push(...user.likedStations)
				return favoritesStations
			}
			else return this.stations.slice(6, 11)
		},
		recomended() {
			return this.stations.slice(11)
		},
	},
	methods: {
		scrollDown() {
			const div = this.$refs.stationMain
			const yOffset = -80;
			const y = div.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y })
		},
		onImgLoad() {
			this.loaded = true;
		},
	},
	watch: {
		$route: {
			immediate: true,
			handler() {
				//reset filter when coming home page
				this.$store.commit({ type: "setFilter" })
				this.$store.dispatch({ type: "loadStations" })
			},
		},
	},
	created() {
	},
};
</script>
