<template>
  <section v-if="msgs" class="chat-container">
    <h2>The wall</h2>
    <ul class="clear-list msg-list">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <section class="msg-info">
<h3>{{msg.from.name+msg.from._id}}</h3>
             <h4> {{formatDate(msg.sentAt)}}</h4>
        </section>
        <section class="msg-text">
          {{ msg.txt }}
        </section>
    
      </li>
  <section class="msg-form">
      <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>
  </section>
    </ul>
  </section>
</template>

<script>
import { chatService } from "@/services/chat-service.js";
import {socketService} from '@/services/socket-service.js';
export default {
  props:{
    stationId:{
      type:String
    }
  },
    async created(){
          socketService.emit('chat topic', this.stationId)
          socketService.on('new msg',this.loadMsgs);
        if(!this.msgs.length){
          this.msgs=await chatService.query(this.stationId);
        }
    },
  data() {
    return {
      msgs: [],
      msg: chatService.getEmptyMsg(),
    };
  },
  methods:{
  async  sendMsg(){
    this.msg.stationId=this.stationId;
     await chatService.add(this.msg);
     this.msgs.push(this.msg);
     const reply=await chatService.botReply(this.msg);
     this.msgs.push(reply);
     this.msg=chatService.getEmptyMsg();
    },
    loadMsgs(msgs){
      this.msgs=msgs;
      // this.msgs=msgs.filter(msg=>msg.station===this.stationId);
    },
    formatDate(timeStamp){
      return new Date(timeStamp).toLocaleString();
    }
  },
  destroyed(){
     socketService.off('new msg',this.loadMsgs);
  }
};
</script>

<style>
</style>