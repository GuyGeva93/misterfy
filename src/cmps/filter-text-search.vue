<template>
  <section class="filter-search-container">
    <form @submit.prevent="search">
      <input type="search" name="search" placeholder="Search for a station" v-model="name" />
      <button>🔍</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.name)
    }
  },
};
</script>

<style>
</style>