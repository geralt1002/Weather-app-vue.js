<template>
  <div>
    <b-container fluid="sm" v-if="this.$store.state.dataIsRecived" class="mb-4">
      <b-row class="weather-main-info m-auto">
        <b-col class="m-auto">
          <h2 class="m-2">{{ current.name }}</h2>
          <p>{{ date(current.dt) }}</p>
          <i :class="current | classWICurrent" class="wi m-5"></i>
          <p class="weather-description">
            {{ current.weather[0].description }}
          </p>
          <p class="current-temp mb-0">
            {{ Math.round(current.main.temp) }} °C
          </p>
          <p>Odczucie {{ Math.round(current.main.feels_like) }} °C</p>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="current" v-if="this.$store.state.dataIsRecived">
      <b-row class="justify-content-center">
        <b-col sm="4" class="mb-2 weather-detalis--color">
          <b-row
            class="mb-2 p-2 border-item align-items-center align-self-center"
          >
            <b-col cols="1" class="pl-2 pr-2 justify-content-start text-left">
              <i class="weather-details--size wi wi-strong-wind"></i>
            </b-col>
            <b-col cols="6" class="text-left">Prędkość wiatru</b-col>
            <b-col class="justify-content-start text-right">
              {{ current.wind.speed }} m/s
            </b-col>
          </b-row>
          <b-row class="mb-2 p-2 border-item">
            <b-col cols="1" class="pl-3 pr-2 justify-content-start text-left">
              <i class="weather-details--size wi wi-wind-direction"></i>
            </b-col>
            <b-col cols="5" class="text-left">Kierunek wiatru</b-col>
            <b-col class="justify-content-start text-right"
              >{{ direction(current.wind.deg) }}
            </b-col>
          </b-row>
          <b-row class="mb-2 p-2 border-item">
            <b-col cols="1" class="pl-3 pr-2 justify-content-start text-left">
              <i class="weather-details--size wi wi-barometer"></i>
            </b-col>
            <b-col cols="6" class="text-left">Ciśnienie</b-col>
            <b-col class="justify-content-start text-right"
              >{{ current.main.pressure }} hPa
            </b-col>
          </b-row>
          <b-row class="p-2">
            <b-col cols="1" class="pl-3 justify-content-start text-left">
              <i class="weather-details--size wi wi-humidity"></i>
            </b-col>
            <b-col cols="6" class="text-left">Wilgotność</b-col>
            <b-col class="justify-content-start text-right">
              {{ current.main.humidity }} %
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="4" class="mb-2 weather-detalis--color">
          <b-row
            class="mb-2 p-2 border-item align-items-center align-self-center"
          >
            <b-col cols="1" class="pl-2 pr-2 justify-content-start text-left">
              <i class="weather-details--size wi wi-sunrise"></i>
            </b-col>
            <b-col cols="6" class="text-left">Wschód słońca</b-col>
            <b-col class="justify-content-start text-right">
              {{ sun(current.sys.sunrise) }}
            </b-col>
          </b-row>
          <b-row class="mb-2 p-2 border-item">
            <b-col cols="1" class="pl-2 pr-2 text-center">
              <i class="weather-details--size wi wi-sunset"></i>
            </b-col>
            <b-col cols="6" class="text-left">Zachód słońca</b-col>
            <b-col class="justify-content-start text-right">
              {{ sun(current.sys.sunset) }}
            </b-col>
          </b-row>
          <b-row class="mb-2 p-2 border-item">
            <b-col cols="1" class="pl-3 text-center">
              <i
                class="weather-details--size wi wi-thermometer text-center m-auto"
              ></i>
            </b-col>
            <b-col cols="6" class="text-left">Max temp</b-col>
            <b-col class="justify-content-start text-right">
              {{ Math.round(current.main.temp_max) }} °C
            </b-col>
          </b-row>
          <b-row class="p-2">
            <b-col cols="1" class="pl-3 justify-content-center text-left">
              <i class="weather-details--size wi wi-thermometer-exterior"></i>
            </b-col>
            <b-col cols="6" class="text-left">Min temp</b-col>
            <b-col class="justify-content-start text-right">
              {{ Math.round(current.main.temp_min) }} °C
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateSettings } from '../mixins/js/date_settings'
import { WiIcon } from '../mixins/js/wi_icon_mixin'

export default {
  mixins: [dateSettings, WiIcon],

  name: 'current',
  methods: {
    direction(direction) {
      if (
        (direction >= 350 && direction <= 360) ||
        (direction >= 0 && direction <= 30)
      ) {
        return 'pólnoc'
      } else if (direction >= 31 && direction <= 70) {
        return 'pólnocny wschód'
      } else if (direction > 70 && direction < 110) {
        return 'wschód'
      } else if (direction >= 110 && direction <= 160) {
        return 'południowy wschód'
      } else if (direction > 160 && direction <= 190) {
        return 'południe'
      } else if (direction > 190 && direction < 250) {
        return 'południowy zachód'
      } else if (direction >= 250 && direction <= 290) {
        return 'zachód'
      } else if (direction > 290 && direction < 350) {
        return ' północny zachód'
      }
    },
  },
  computed: {
    ...mapState({ current: 'currentWeather' }),
  },
}
</script>
<style lang="scss" scoped>
@import '../mixins/scss/flex_mixin.scss';

.weather-main-info {
  width: 50%;
  border-radius: 18px 18px 18px 18px;
  border: 11px outset rgba(82, 142, 211, 0.3);
  box-shadow: 10px 11px 46px 0px rgba(0, 0, 0, 0.63);
}
.wi {
  font-size: 8rem;
  @include flexCenter;
}
.current-temp {
  font-size: 3rem;
}
.weather-description {
  font-size: 1.2rem;
}
.weather-details--size {
  font-size: 1.1em;
}
.weather-detalis--color {
  background: rgb(77, 42, 202, 0.5);
}
.border-item {
  border-bottom: 1px solid rgb(36, 63, 95);
}
/*media query */
@media (max-width: 600px) {
  .weather-main-info {
    width: 100%;
  }
}
@media (max-width: 300px) {
  .wi {
    font-size: 4rem;
  }
}
</style>
