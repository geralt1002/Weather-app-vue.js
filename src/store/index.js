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
  },
  mutations: {
    setlocation: (state, city) => (state.searchCity = city),
    currentWeather: (state, currentWeather) =>
      (state.currentWeather = currentWeather),
    forecastWeather: (state, forecastWeather) =>
      (state.forecastWeather = forecastWeather),
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
            //response1 is the result of first call
            commit('currentWeather', current.data)
            // console.log(current.data)

            state.dataIsRecived = true
            //response2 is the result of second call
            commit(
              'forecastWeather',
              forecast.data.list.filter((forecast) => forecast['dt_txt'])
            )
            // console.log(forecast.data.list)
          })
        )
        .catch((error) => {
          //  console.log(error)
        })
    },
  },
})
