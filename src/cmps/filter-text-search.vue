<template>
  <section class="filter-search-container">
    <form @submit.prevent="search">
      <input type="search" name="search" placeholder="Search for a station" v-model="query" />
      <button>🔍</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.query)
    }
  },
};
</script>

<style>
</style>