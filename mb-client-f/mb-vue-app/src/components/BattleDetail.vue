<template>
  <div class="d-flex justify-content-center flex-column">
    <h1>상세페이지</h1>
    <h2>주제 : {{ postbattle.title }}</h2>
    <br>
    <br>
    <!-- <h3>{{ postbattle.movie_title_1 }}</h3>
    <h3>{{ postbattle.movie_title_2 }}</h3> -->
    <!-- <h3>{{ movie_1[0].title }}</h3> -->
    <div class="d-flex justify-content-center">
      <div class="card" style="width: 30%; height: 50%;">
        <div style="color: black; font-size: 20px;"> {{ movie_1[0].title }} </div>
        <img style="width: 100%; height: 400px;" :src="poster_movie_1" class="card-img-top" alt="..."/>
        <div class="mb-3 form-check">
          <input @click="onClick1" type="checkbox" class="form-check-input" id="exampleCheck1">
          <label style="color: black; font-size: 20px;" class="form-check-label" for="exampleCheck1">투표</label>
        </div>
      </div>

      <img tyle="width: 50px; height: 50px;" src="@/assets/vs.png" alt="">
      
      <div class="card" style="width: 30%; height: 50%;">
        <div style="color: black; font-size: 20px;"> {{ movie_2[0].title }} </div>
        <img style="width: 100%; height: 400px;" :src="poster_movie_2" class="card-img-top" alt="..."/>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label style="color: black; font-size: 20px;" class="form-check-label" for="exampleCheck1">투표</label>
        </div>
      </div>
    </div>

    <div class="d-flex justify-space-around">
      <div>
        <h1>{{ movie_1_vote_count }}</h1>
      </div>

      <div>
        <h1>{{ movie_2_vote_count }}</h1>
      </div>
    </div>
    
    
  </div>
</template>

<script>

export default {
  name: 'BattleDetail',
  computed: {
    postbattle() {
      return this.$store.state.postbattle
    },
    poster_movie_1() {
      return `https://image.tmdb.org/t/p/w500${this.$store.state.postmovie1[0].poster_path}`
    },
    poster_movie_2() {
      return `https://image.tmdb.org/t/p/w500${this.$store.state.postmovie2[0].poster_path}`
    },
    movie_1() {
      return this.$store.state.postmovie1
    },
    movie_2() {
      return this.$store.state.postmovie2
    },
    movie_1_url() {
      return this.$store.state.movie1url
    },
    movie_1_vote_count() {
      return this.$store.state.movie_1_count
    },
    movie_2_vote_count() {
      return this.$store.state.movie_2_count
    }
  },
  methods: {
    onClick1: function() {
      // const movie_data_1 = this.movie_1[0]
      // console.log(movie_data_1)
      // console.log('1')
      // this.$store.dispatch('FETCH_VOTE_MOVIE', movie_data_1)
    }
  },
  async created() {
    const post_movie_id1 = this.postbattle.movie_title_1
    const post_movie_id2 = this.postbattle.movie_title_2
    const movie_data_1 = this.movie_1[0]
    const movie_data_2 = this.movie_2[0]

    // const post_movie_id_tail = this.post_movie_1[0].poster_path
    this.$store.dispatch('FETCH_POST_MOVIE_1', post_movie_id1)
    this.$store.dispatch('FETCH_POST_MOVIE_2', post_movie_id2)
    this.$store.dispatch('FETCH_VOTE_MOVIE_COUNT_1', movie_data_1)
    this.$store.dispatch('FETCH_VOTE_MOVIE_COUNT_2', movie_data_2)
    // this.$store.dispatch('FETCH_POST_MOVIE_1_URL', post_movie_id_tail)
    
  }

}
</script>

<style>
</style>