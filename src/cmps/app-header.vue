<template>
	<header>
		<div v-if="isCreating" class="screen-cover"></div>
		<span class="logo" @click="goHome">
			<img class="logo-img" src="../assets/logo/logo-no-txt.png" alt="" />
			<img class="logo-txt" src="../assets/logo/logo-txt.png" />
		</span>
		<filter-text-search @search="search" />
		<h2 v-if="loggedinUser">Hello, {{ loggedinUser.fullname }}</h2>
		<nav class="main-nav">
			<button class="creatify-btn" @click.stop="toggleCreating">
				Creatify
			</button>
			| <router-link to="/explore" @click.native="scrollTop">Explore</router-link>|
			<router-link to="/about">About</router-link>|
			<template v-if="!loggedinUser">
				<router-link to="/signup">Signup</router-link></template
			>
			<template v-else><button @click="logout" class="logout-btn">Logout</button></template>
		</nav>
		<station-add v-if="isCreating" @closeModal="toggleCreating" />
	</header>
</template>

<script>
import filterTextSearch from "@/cmps/filter-text-search";
// import { youtubeService } from "@/services/youtube-service.js";
import stationAdd from "@/cmps/station-add.vue";
export default {
	data() {
		return {
			isCreating: false,
		};
	},
	methods: {
		scrollTop() {
			window.scrollTo(0, 0);
		},
		goHome() {
			this.$router.push("/");
			window.scrollTo(0, 0);
		},
		search(name) {
			//Preventing duplicated route error
			const currName = this.$route.params.name;
			if (currName && currName === name) return;
			if (!name) name = "*";
			let url = "/explore/" + name;
			if (this.tag) url += "/" + this.tag;

			this.$router.push(url).catch((err) => {
				//When same route appears
				if (err.name != "NavigationDuplicated") {
					throw err;
				}
			});

			//   const res = await youtubeService.name(name);
			//   res.items.map((item) => {
			//     console.log("video id:", item.id.videoId);
			//     console.log("video snippet:", item.snippet.title);
			//     console.log("video thumbnail:", item.snippet.thumbnails.default);
			//     console.log("video publishedAt:", item.snippet.publishedAt);
			//   });
		},

		toggleCreating() {
			return (this.isCreating = !this.isCreating);
		},
		async logout() {
			await this.$store.dispatch({ type: "logout" });
		},
	},
	computed: {
		tag() {
			return this.$route.params.tag;
		},
		loggedinUser() {
			return this.$store.getters.loggedinUser;
		},
	},

	components: {
		filterTextSearch,
		stationAdd,
	},
};
</script>
