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
    }

  },
  actions: {
    async FETCH_POST_MOVIE_1({ commit }, post_movie_id) {
      const BATTLE_MOVIE_URL = 'http://localhost:8000/api/v1/community/movie_list/'
      // console.log(post_movie_id)
      const response = await axios.get(BATTLE_MOVIE_URL)
      const responsedata = response.data
      const ans1 = responsedata.filter(movie => movie.id === post_movie_id)
      console.log(commit)
      // console.log(post_movie_id)
      // console.log(response)
      console.log(ans1)

      commit('POST_MOVIE_1', ans1)
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