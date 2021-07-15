<template>
  <section class="song-list-options">
    <div>♥</div>
    <div @click.stop="toggleSearch">➕</div>
    <form @submit.prevent="search">
    <input type="search" placeholder="Search for a song" v-if="isSearch" v-model="txt"/>
    </form>
    <div>🚮</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isSearch: false,
      txt:''
    };
  },

  methods: {
    toggleSearch() {
      this.isSearch = !this.isSearch
    },
    search(){
      this.$emit('search',this.txt)
    }
  },
};
</script>
