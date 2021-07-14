<template>
<main class="explore-container">
  <section class="explore main">
   <ul class="tags-list">
     <li class="tag-preview">
All
     </li>
<li v-for="(tag,idx) in tags" :key="idx" class="tag-preview">
  {{tag}}
</li>
   </ul>
  </section>
</main>
</template>

<script>
export default {
  data() {
    return {
        tags:['Easy','Pop','Punk','Israeli','hip-hop','electronic','latin','classic','blues','disco']
    };
  },
};
</script>

<style>
</style>