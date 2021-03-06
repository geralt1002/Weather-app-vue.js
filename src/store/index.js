import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import apiRequest from '../services/api-request'
import apiClient from '../services/services'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    dataIsRecived: false,
    currentWeather: {},
    forecastWeather: [],
    searchCity: '',
    isError: false,
  },
  mutations: {
    setlocation: (state, city) => (state.searchCity = city),
    currentWeather: (state, currentWeather) =>
      (state.currentWeather = currentWeather),
    forecastWeather: (state, forecastWeather) =>
      (state.forecastWeather = forecastWeather),
    setError: (state, isError) => (state.isError = isError),
  },
  actions: {
    fetchWeather({ state, commit }, city) {
      axios
        .all([
          apiClient.get(apiRequest.currentWeather(city)),
          apiClient.get(apiRequest.forecastWeather(city)),
        ])
        .then(
          axios.spread(function (current, forecast) {
            state.dataIsRecived = true
            //response 1
            commit('currentWeather', current.data)
            // console.log(current.data)

            state.dataIsRecived = true
            //response 2
            commit(
              'forecastWeather',
              forecast.data.list.filter((forecast) => forecast['dt_txt'])
            )

            setTimeout(() => {
              commit('setError', false)
            }, 400)
          })
        )

        .catch((error) => {
          commit('setError', true)
        })
    },
  },
})
