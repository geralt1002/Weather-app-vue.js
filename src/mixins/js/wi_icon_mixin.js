import moment from 'moment'

export const WiIcon = {
  filters: {
    classWICurrent(current) {
      let weatherID = current.weather[0].id

      if (moment().format('HH') > 5 && moment().format('HH') < 20) {
        if (weatherID === 804) {
          return `wi-cloudy`
        }
        return `wi-owm-day-${weatherID}`
      } else {
        return `wi-owm-night-${weatherID}`
      }
    },
    classWIForecast(forecast) {
      if (forecast.weather[0].id === 804) {
        return 'wi-cloudy'
      } else {
        return `wi-owm-${forecast.sys.pod == 'd' ? 'day' : 'night'}-${
          forecast.weather[0].id
        }`
      }
    },
  },
}
