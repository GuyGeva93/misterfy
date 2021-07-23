<template>
  <section class="modal">
    <button @click="closeModal" class="btn-close">✖</button>
    <h2>{{ msg.txt }}</h2>
    <button @click="setOk">Ok</button>
    <button @click="closeModal">Cancel</button>
  </section>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
    },
  },
  methods: {
    setOk() {
      this.$emit("setOk");
          this.$emit("closeModal");
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>