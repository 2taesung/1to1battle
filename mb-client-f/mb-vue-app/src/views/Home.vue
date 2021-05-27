<template>
  <div class="home">
    <h1>
      <img style="top:10px; width: 30%; " src="@/assets/hot-battle.png/" class="" alt="...">
    </h1>
    <div class="d-flex justify-content-center">
      <h1>{{ movie_hot_1 }}</h1>
      <h1>{{ movie_hot_2 }}</h1>
    </div>

    <div class="center d-flex justify-content-center">
        <img style="top:650px; width: 45%; position: absolute; bottom: 0px; " src="@/assets/logo.png/" class="" alt="...">
        <img style="width: 30%; bottom: 22px;" src="@/assets/img.jpeg" alt="" > 
    </div>

    

  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
    
  },
  computed: {
    movie_hot_1() {
      // const 
      return this.$store.state.movie_hot_1
      // return `https://image.tmdb.org/t/p/w500${this.$store.state.postmovie1[0].poster_path}`
    },
    movie_hot_2() {
      // const 
      return this.$store.state.movie_hot_2
      // return `https://image.tmdb.org/t/p/w500${this.$store.state.postmovie1[0].poster_path}`
    }
  },
  async created() {
    this.$store.dispatch('FETCH_RECOMMAND')
  }
}
</script>

<style scoped>
img {
  display:flex;
  margin:auto;
}
</style>