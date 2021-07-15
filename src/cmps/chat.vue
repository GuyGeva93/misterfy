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
// import { chatService } from "@/services/chat-service.js";
export default {
  data() {
    return {
      msgs: [],
      msg: { from: "me", txt: "" },
    };
  },
  created(){
    //   this.msgs = chatService.query();
  }
};
</script>

<style>
</style>