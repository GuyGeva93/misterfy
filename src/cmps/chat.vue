<template>
  <section v-if="msgs" class="chat-container">
    <h2>The wall</h2>
    <ul class="clear-list msg-list">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <chat-msg-preview :msg="msg" :userId="currUserId"  />
      </li>
    </ul>
    <form @submit.prevent="sendMsg" class="msg-form">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>
  </section>
</template>

<script>
import { chatService } from "@/services/chat-service.js";
import { socketService } from "@/services/socket-service.js";
import chatMsgPreview  from './chat-msg-preview.vue';
export default {
  props: {
    stationId: {
      type:String
    },
  },

  async created() {
    socketService.emit("chat topic", this.stationId);
    socketService.on("new msg", this.loadMsgs);
    if (!this.msgs.length) {
      this.msgs = await chatService.query(this.stationId);
    }
      if(!this.currUserId){
        this.$store.commit({type:'setUserId'});
      }
  },
  data() {
    return {
      msgs: [],
      msg: chatService.getEmptyMsg(),
    };
  },
  computed:
  {
currUserId(){
  return this.$store.getters.currUserId;
}
  },
  methods: {
    async sendMsg() {
    
      this.msg.stationId = this.stationId;
      this.msg.from._id=this.currUserId;
      await chatService.add(this.msg);
      this.msgs.push(this.msg);
      const reply = await chatService.botReply(this.msg);
      this.msgs.push(reply);
      this.msg = chatService.getEmptyMsg();
    },
    loadMsgs(msgs) {
      this.msgs = msgs;
      // this.msgs=msgs.filter(msg=>msg.station===this.stationId);
    },

  },
  destroyed() {
    socketService.off("new msg", this.loadMsgs);
  },
  components:{
    chatMsgPreview
  }
};
</script>

<style>
</style>