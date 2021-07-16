<template>
  <article class="tag" :class="activeTag">
{{tag}}
  </article>
</template>

<script>
export default {
props:{
    tag:{
        type:String
    }
},
computed:{
    activeTag(){
        const {tag}= this.$route.params;
        console.log(tag);
        console.log(this.tag);
        return ((!tag && this.tag==='All')||tag===this.tag) ? 'active' :'';
    }
}
}
</script>

<style>

</style>