<template>
  <div>
    <h1>상세페이지</h1>
    <h2>주제 : {{ postbattle.title }}</h2>
    <h3>{{ postbattle.movie_title_1 }}</h3>
    <h3>{{ postbattle.movie_title_2 }}</h3>
    <h3>{{ post_movie_1 }}</h3>
    
    
  </div>
</template>

<script>

export default {
  name: 'BattleDetail',
  computed: {
    postbattle() {
      return this.$store.state.postbattle
    },
    post_movie_1() {
      return this.$store.state.postmovie1
    }
  },
  async created() {
    const post_movie_id = this.postbattle.movie_title_1
    this.$store.dispatch('FETCH_POST_MOVIE_1', post_movie_id)
    
  }

}
</script>

<style>
</style>