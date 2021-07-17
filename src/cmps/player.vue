<template>
	<section class="player" v-if="songId">
		<section class="player-controls">
			<marquee-text>
				<span>1 2 3 4</span>
			</marquee-text>

			<!-- forward button: -->
			<span
				><svg
					class="player-next-btn"
					@click.stop="prevSong"
					width="20px"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="backward"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="white"
						d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
					></path></svg
			></span>
			<!-- play button: -->
			<span v-if="isPlay" @click.stop="togglePlay">
				<svg
					class="player-play-btn"
					width="20px"
					aria-hidden="true"
					focusable="false"
					data-prefix="far"
					data-icon="play-circle"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="white"
						d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"
					></path>
				</svg>
			</span>
			<span v-else @click.stop="togglePlay"
				><svg
					class="player-pause-btn"
					width="20px"
					aria-hidden="true"
					focusable="false"
					data-prefix="far"
					data-icon="pause-circle"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="white"
						d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"
					></path></svg
			></span>
			<span @click.stop="nextSong"
				><svg
					class="player-forward-btn"
					width="20px"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="forward"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="white"
						d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"
					></path></svg
			></span>
		</section>
		<vue-plyr ref="plyr">
			<div class="plyr__video-embed" id="player">
				<iframe :src="src" allowtransparency allow="autoplay"></iframe>
			</div>
		</vue-plyr>
	</section>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
export default {
	data() {
		return {
			currSongId: "",
			isPlay: false,
		};
	},
	mounted() {
		if (!this.$refs.plyr) return; // When player isn't ready

		this.$refs.plyr.player.on("ready", () => {
			this.$refs.plyr.player.play();
		});
		this.$refs.plyr.player.on('playing', () => {
			this.$store.commit({ type: 'isPlaying' })
		})
		this.$refs.plyr.player.on('pause', () => {
			this.$store.commit({ type: 'isPlaying' })
		})
		this.$refs.plyr.player.on("ended", () => {
			this.$store.commit({ type: "nextSong" });
			this.$refs.plyr.player.play();
		});
	},
	methods: {
		togglePlay() {
			if (this.isPlay) {
				this.$refs.plyr.player.play();
			} else {
				this.$refs.plyr.player.pause();
			}
			this.isPlay = !this.isPlay;
		},
		prevSong() {
			this.$store.commit({ type: "prevSong" });
		},
		nextSong() {
			this.$store.commit({ type: "nextSong" });
		},
	},
	computed: {
		songId() {
			return this.$store.getters.currSongId;
		},
		src() {
			return `https://www.youtube.com/embed/${this.songId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;
		},
	},
	components: {
		MarqueeText,
	},
};
</script>

<style>
</style>