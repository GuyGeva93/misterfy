<template>
  <section class="chat-msg-preview" :class="msgSender" >
    <section class="msg-info" :class="msgSender" >
    <section>
          <h3>{{ msg.from.name + msg.from._id }}</h3>
      <h4>{{ formattedDate }}</h4>
    </section>
      <section class="msg-text">
      {{ msg.txt }}
    </section>
    </section>
    
  </section>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
    },
    userId: {
      type: Number,
    },
  },
  computed: {
    formattedDate() {
      return new Date(this.msg.sentAt).toLocaleTimeString();
    },
    msgSender(){
        return {sender:this.userId===this.msg.from._id};
    }
  },
};
</script>

<style>
</style>