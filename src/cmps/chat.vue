<template>
  <section v-if="msg">
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    <hr />
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>
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
          this.loadMsgs();
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
    }
  },
  destroyed(){
     socketService.off('new msg',this.loadMsgs);
  }
};
</script>

<style>
</style>