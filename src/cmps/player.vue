<template>
	<section class="player" v-if="songId">
		
		<section class="player-controls">
			<marquee-text :repeat="1" :duration="3"> Long test check </marquee-text>
			<span @click.stop="prevSong">⏪</span>
			<span v-if="isPlay" @click.stop="togglePlay">▶</span>
			<span v-else @click.stop="togglePlay">⏸</span>
			<span @click.stop="nextSong">⏩</span>
		</section>
		<vue-plyr ref="plyr">
			<div class="plyr__video-embed" id="player">
				<iframe :src="src" allowtransparency allow="autoplay"></iframe>
			</div>
		</vue-plyr>
	</section>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
export default {
	data() {
		return {
			currSongId: "",
			isPlay: false
		};
	},
	mounted() {
		if (!this.$refs.plyr) return // When player isn't ready

		this.$refs.plyr.player.on("ready", () => {
			this.$refs.plyr.player.play()
		})
		this.$refs.plyr.player.on("ended", () => {
			this.$store.commit({ type: 'nextSong' })
			this.$refs.plyr.player.play()
		})
	},
	methods: {
		togglePlay() {
			if (this.isPlay) {
				console.log('play')
				this.$refs.plyr.player.play()
			} else {
				console.log('pause')
				this.$refs.plyr.player.pause()
			}
			this.isPlay = !this.isPlay
		},
		prevSong() {
			this.$store.commit({ type: 'prevSong' })
		},
		nextSong() {
			this.$store.commit({ type: 'nextSong' })
		}
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
}
</script>

<style>
</style>