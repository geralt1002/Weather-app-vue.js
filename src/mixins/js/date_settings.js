import dayjs from 'dayjs'
import 'dayjs/locale/pl'

dayjs.locale('pl')

const useDateSettings = () => {
  const date = (time) => {
    return dayjs(time * 1000).format('dddd DD MMMM YYYY')
  }

  const time = (time) => {
    return dayjs(time * 1000).format('dd HH:mm')
  }

  const sun = (time) => {
    return dayjs(time * 1000).format('HH:mm')
  }

  return { date, time, sun }
}

export default useDateSettings
