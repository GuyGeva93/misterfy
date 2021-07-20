<template>
	<section v-if="msgs" class="chat-container">
		<section class="chat" ref="chat">
			<h2>The wall</h2>
			<ul class="clear-list msg-list">
				<li v-for="(msg, idx) in msgs" :key="idx">
					<chat-msg-preview :msg="msg" :userId="currUserId" />
				</li>
			</ul>
		</section>
		<form @submit.prevent="sendMsg" class="msg-form">
			<input type="text" v-model="msg.txt" placeholder="Say something nice" />
			<button class="btn-send">
				<svg
					width="30px"
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="paper-plane"
					class="chat-send-icon"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
					></path>
				</svg>
			</button>
		</form>
	</section>
</template>

<script>
import { chatService } from "@/services/chat-service.js";
import { socketService } from "@/services/socket-service.js";
import chatMsgPreview from "./chat-msg-preview.vue";
export default {
	props: {
		stationId: {
			type: String,
		}
		
	},

	async created() {
		socketService.emit("chat topic", this.stationId)
		socketService.on("chat addMsg", this.loadMsgs)
		if (!this.msgs.length) {
			try {
				this.msgs = await chatService.query(this.stationId)
			} catch (err) {
				console.log('Error on chat query =>', err)
			}
		}
		if (!this.currUserId) {
			this.$store.commit({ type: "setUserId" })
		}
	},
	data() {
		return {
			msgs: [],
			msg: chatService.getEmptyMsg(),
		};
	},
	computed: {
		currUserId() {
			return this.$store.getters.currUserId;
		},
	},
	methods: {
		async sendMsg() {
			if (!this.msg.txt) return;
			// const { chat } = this.$refs;

			this.msg.stationId = this.stationId
			this.msg.from._id = this.currUserId
				const copiedMsg=JSON.parse(JSON.stringify(this.msg));
			try {
				await chatService.add(this.msg)
				this.msg = chatService.getEmptyMsg()
				socketService.emit('chat newMsg',copiedMsg)
			} catch (err) {
				console.log('Error on chat add =>', err)
			}
				// this.msgs.push(copiedMsg)
			// setTimeout(()=>{
			// 	chat.scrollTo(0,chat.scrollHeight)
			// },0)

			try {
				const reply = await chatService.botReply(copiedMsg)
				socketService.emit('chat newMsg',reply)
		
			// this.msgs.push(reply);
		
			} catch (err) {
				console.log('Error on chat bot reply =>', err)
			}
			// 	setTimeout(()=>{
			// 	chat.scrollTo(0,chat.scrollHeight)
			// },0)
			
		},
		async loadMsgs() {
			const { chat } = this.$refs;
			this.msgs =await chatService.query(this.stationId);
			console.log(this.msgs,'hello');
				setTimeout(()=>{
				chat.scrollTo(0,chat.scrollHeight)
			},0)
		},
	},
	destroyed() {
		socketService.off("chat addMsg", this.loadMsgs);
	},
	components: {
		chatMsgPreview,
	},
};
</script>

<style>
</style>