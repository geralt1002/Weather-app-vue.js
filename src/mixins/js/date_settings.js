import moment from 'moment'
import localization from 'moment/locale/pl'

export const dateSettings = {
  methods: {
    date(time) {
      return moment(time * 1000).format('dddd DD MMMM YYYY')
    },
    time(time) {
      return moment(time * 1000).format('dd HH:mm')
    },
    sun(time) {
      return moment(time * 1000).format('HH:mm')
    },
  },
}
