import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('jwt')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `JWT ${token}`
  } else {
    axios.defaults.headers.common['Authorization'] = ''
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

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
    movie_hot_1:[],
    movie_hot_1_poster_url:[],
    movie_hot_2:[],
    movie_hot_2_poster_url:[],
    
    token: localStorage.getItem('token'),
  },
  getters: {
    getBattleList(state) {
      return state.battleList
    },
    getPostBattle_Movie(state) {
      return state.postbattle
    },

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
    },
    MOVIE_HOT_TWO(state, movie_hot) {
      state.movie_hot_1 = movie_hot.movie_title_1
      state.movie_hot_2 = movie_hot.movie_title_2
    },
    GET_POSTER_URL1(state, responsedata){
      const hotmovie_1_data = responsedata.filter(movie => movie.id === state.movie_hot_1)
      console.log(hotmovie_1_data)
      state.movie_hot_1_poster_url = hotmovie_1_data[0].poster_path
    },
    GET_POSTER_URL2(state, responsedata){
      const hotmovie_2_data = responsedata.filter(movie => movie.id === state.movie_hot_2)
      console.log(hotmovie_2_data)
      state.movie_hot_2_poster_url = hotmovie_2_data[0].poster_path
    }

  },
  actions: {
    // async getPosterHot2({ commit }){
    //   console.log(commit)
    //   const BATTLE_MOVIE_URL = 'http://localhost:8000/api/v1/community/movie_list/'
    //   const response = await axios.get(BATTLE_MOVIE_URL)
    //   const responsedata = response.data

    //   commit('GET_POSTER_URL1', responsedata)
    //   commit('GET_POSTER_URL2', responsedata)
    // },
    async getPosterHot1({ commit }){
      console.log(commit)
      const BATTLE_MOVIE_URL = 'http://localhost:8000/api/v1/community/movie_list/'
      const response = await axios.get(BATTLE_MOVIE_URL)
      const responsedata = response.data
      // console.log(responsedata)
      // const hot1 = $state.movie_hot_1
      // console.log(hot1)
      // const ans1 = responsedata.filter(movie => movie.id === hot1)
      // console.log(ans1)
      commit('GET_POSTER_URL1', responsedata)
      commit('GET_POSTER_URL2', responsedata)

      // return ans1.poster_path
    },
    async FETCH_RECOMMAND({ commit }) {
      console.log(commit)
      // console.log('추천')
      const RECOMMAND_URL = `http://localhost:8000/api/v1/community/recommand/`
      let response = await axios.get(RECOMMAND_URL)
      console.log(response.data)
      // commit(response)
      const movie_hot = response.data
      commit('MOVIE_HOT_TWO', movie_hot)

    },
    async FETCH_VOTE_MOVIE({ commit }, movie_data_1) {
      console.log(commit)
      // console.log(movie_data_1)
      const token = sessionStorage.getItem('jwt')
      const options = {
        headers: {
          Authorization: 'JWT ' + token
        }
      }
  
      const vote_movie_id = movie_data_1.id
      const VOTE_MOVIE= `http://localhost:8000/api/v1/community/my_vote/${vote_movie_id}/`
      let response = await axios.post(VOTE_MOVIE, options)
      
      // const token = response.data.access
      // localStorage.setItem('token', token)
      // commit('', token)
      console.log(response)
    },
    async FETCH_DELETE_POST({ commit }, battle){
      console.log(commit)
      console.log(battle)
      const battle_id = battle.id
      const BATTLE_DETAIL= `http://localhost:8000/api/v1/community/post_detail/${battle_id}/`
      let response = await axios.delete(BATTLE_DETAIL)
      // response = targetTodo
      console.log(response)

      // commit('DELETE_TODO', targetTodo)

    },
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