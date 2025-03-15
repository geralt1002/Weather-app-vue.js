import { defineStore } from 'pinia'
import axios from 'axios'
import apiRequest from '../services/api-request'
import apiClient from '../services/services'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    dataIsReceived: false,
    currentWeather: {},
    forecastWeather: [],
    searchCity: '',
    isError: false,
  }),
  actions: {
    async fetchWeather(city) {
      try {
        const [current, forecast] = await axios.all([
          apiClient.get(apiRequest.currentWeather(city)),
          apiClient.get(apiRequest.forecastWeather(city)),
        ])
        // console.log('Current Weather:', current.data) // Log current weather data
        // console.log('Forecast Weather:', forecast.data)

        this.currentWeather = current.data
        this.forecastWeather = forecast.data.list.filter((forecast) => forecast['dt_txt'])
        this.dataIsReceived = true
        this.isError = false
      } catch (error) {
        if (error.response.status === 404) {
          this.isError = true
          // console.log('error:' + error)
        } else {
          this.isError = true
          this.dataIsReceived = false
          // console.log('error:' + error)
        }
      }
    },
  },
})
