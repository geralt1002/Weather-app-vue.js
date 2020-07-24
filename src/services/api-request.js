import api from './api_config'

export default {
  currentWeather(city) {
    return `weather?q=${city}${api.LANG}`
  },
  forecastWeather(city) {
    return `forecast?q=${city}${api.LANG}`
  },
}
