<template>
    <header>
      <div class="logo" @click="goHome" >
        Misterfy
      </div>
<filter-text-search/>
      <nav class="main-nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/explore">Explore</router-link> |
        <router-link to="/dashboard">Dashboard</router-link> |
        <router-link to="/misterfy">Misterfy</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </header>
</template>

<script>
import filterTextSearch from '@/cmps/filter-text-search';
export default {
methods:{
goHome(){
  this.$router.push('/');
}
},
components:{
  filterTextSearch
}


};
</script>

<style>
</style>