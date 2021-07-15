<template>
  <section v-if="msgs" class="chat-container">
    <h2>The wall</h2>
    <ul class="clear-list msg-list">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <section class="msg-info">
<h3>{{msg.from}}</h3>
             <h4> {{formatDate(msg.sentAt)}}</h4>
        </section>
        <section class="msg-text">
          {{ msg.txt }}
        </section>
    
      </li>
    </ul>
    <hr />
  <section class="msg-form">
      <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>
  </section>
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
          this.msgs=await chatService.query();
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
     await chatService.add(this.msg);
     this.msgs.push(this.msg);
     this.msg=chatService.getEmptyMsg();
    },
    loadMsgs(msgs){
      this.msgs=msgs;
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