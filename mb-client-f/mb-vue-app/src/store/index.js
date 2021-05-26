import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

// axios.defaults.baseURL = 'http://localhost:8000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movielist: [],
    userInfo: {},
    battleList: [],
    postbattle: {},
    postmovie1: {},
    postmovie2: {},
    movie1url:[],
    movie_1_count:0,
    movie_2_count:0,
    
    token: localStorage.getItem('token'),
  },
  getters: {
    getBattleList(state) {
      return state.battleList
    },
    getPostBattle_Movie(state) {
      return state.postbattle
    }
  },
  mutations: {
    FETCH_BATTLE_LIST(state, battlelist){
      state.battleList = battlelist
    },
    CREATE_USER(state, userInfo) {
      state.userInfo = userInfo
    },
    AUTH_USER(state, token) {
      state.token = token
    },
    DETAIL_POST(state, battle){
      state.postbattle = battle
    },
    POST_MOVIE_1(state, ans1){
      state.postmovie1 = ans1
    },
    POST_MOVIE_2(state, ans2){
      state.postmovie2 = ans2
    },
    MOVIE_1_URL(state, movie_1_url){
      state.movie1url = movie_1_url
    },
    MOVIE_1_VOTE_COUNT(state, movie_1_count){
      state.movie_1_count = movie_1_count
    },
    MOVIE_2_VOTE_COUNT(state, movie_2_count){
      state.movie_2_count = movie_2_count
    }

  },
  actions: {
    async FETCH_VOTE_MOVIE_COUNT_2({ commit }, movie_data_2) {
      console.log(commit)
      const movie_id = movie_data_2.id
      const BATTLE_MOVIE_URL = `http://localhost:8000/api/v1/community/my_vote/${movie_id}/`
      const response = await axios.get(BATTLE_MOVIE_URL)
      console.log(response.data)
      const movie_2_count = response.data.vote_users.length

      commit('MOVIE_2_VOTE_COUNT', movie_2_count)
    },
    async FETCH_VOTE_MOVIE_COUNT_1({ commit }, movie_data_1) {
      console.log(commit)
      const movie_id = movie_data_1.id
      const BATTLE_MOVIE_URL = `http://localhost:8000/api/v1/community/my_vote/${movie_id}/`
      const response = await axios.get(BATTLE_MOVIE_URL)
      console.log(response.data)
      const movie_1_count = response.data.vote_users.length

      commit('MOVIE_1_VOTE_COUNT', movie_1_count)
    },
    async FETCH_POST_MOVIE_1({ commit }, post_movie_id1) {
      const BATTLE_MOVIE_URL = 'http://localhost:8000/api/v1/community/movie_list/'
      // console.log(post_movie_id)
      const response = await axios.get(BATTLE_MOVIE_URL)
      const responsedata = response.data
      const ans1 = responsedata.filter(movie => movie.id === post_movie_id1)
      console.log(commit)
      // console.log(post_movie_id)
      // console.log(response)
      console.log(ans1)

      commit('POST_MOVIE_1', ans1)
    },
    async FETCH_POST_MOVIE_2({ commit }, post_movie_id2) {
      const BATTLE_MOVIE_URL = 'http://localhost:8000/api/v1/community/movie_list/'
      // console.log(post_movie_id)
      const response = await axios.get(BATTLE_MOVIE_URL)
      const responsedata = response.data
      const ans2 = responsedata.filter(movie => movie.id === post_movie_id2)
      console.log(commit)
      // console.log(post_movie_id)
      // console.log(response)
      console.log(ans2)

      commit('POST_MOVIE_2', ans2)
    },
    async FETCH_BATTLE_LIST({ commit }) {
      const BATTLE_LIST_URL = 'http://localhost:8000/api/v1/community/post_list/'
      const response = await axios.get(BATTLE_LIST_URL)
      const battlelist = response.data
      
      commit('FETCH_BATTLE_LIST', battlelist)
    },
    async DETAIL_POST({ commit }, battle) {
      const battleId = battle.Id
      const DETAIL_POST_URL = `http://127.0.0.1:8000/api/v1/community/post_detail/${battleId}`
      const response = await axios.get(DETAIL_POST_URL, battle)
      console.log(response)
      console.log(commit)

      commit('DETAIL_POST', response)
    },
    async FETCH_POST_MOVIE_1_URL({ commit }, post_movie_id_tail){
      const movie_1_url = `https://image.tmdb.org/t/p/w500/${post_movie_id_tail}`

      commit('MOVIE_1_URL', movie_1_url)
    },
 
    AUTH_USER({ commit }, userInfo) {
      return new Promise((resolve) => {
        
        const AUTH_USER_URL = 'http://localhost:8000/api/v1/api-token-auth/'
        const data = userInfo
        axios.post(AUTH_USER_URL, data)
        .then((response) => {

          const token = response.data.access
    
          localStorage.setItem('token', token)
          commit('AUTH_USER', token)
          resolve()
        })

      })

    }
    
  },
  modules: {
  }
})