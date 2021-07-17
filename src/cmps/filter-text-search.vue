<template>
    <form @submit.prevent="search" class="filter-search-container">
      <input class="main-search" type="text" name="search" placeholder="Search for a station" v-model="name" />
      <button><img src="../assets/search-solid.svg"></button>
    </form>
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