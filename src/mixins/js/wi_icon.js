import dayjs from 'dayjs'
import 'dayjs/locale/pl'

dayjs.locale('pl')

const WiIcon = () => {
  const classWICurrent = (current) => {
    // Get the current weather ID
    const weatherID = current.weather[0].id

    // Get the current hour
    const hour = parseInt(dayjs().format('HH'), 10)

    // Check if the current hour is between 6am and 8pm
    // If so, it's daytime. Otherwise, it's nighttime.
    const isDayTime = hour > 5 && hour < 20

    // If the weather is overcast, use the cloudy icon
    if (weatherID === 804) {
      return 'wi-cloudy'
    }

    // Otherwise, use the day or night icon depending on the time of day
    return `wi-owm-${isDayTime ? 'day' : 'night'}-${weatherID}`
  }

  const classWIForecast = ({ weather: [{ id: weatherId }], sys: { pod } }) => {
    // Check if the weather condition is overcast clouds
    // If so, return the icon class for cloudy weather
    if (weatherId === 804) {
      return 'wi-cloudy'
    }
    // Determine the time of day based on the 'pod' value
    // 'd' stands for day and 'n' stands for night
    // Return the appropriate icon class based on the time of day and weather ID
    return `wi-owm-${pod === 'd' ? 'day' : 'night'}-${weatherId}`
  }

  return { classWICurrent, classWIForecast }
}

export default WiIcon
