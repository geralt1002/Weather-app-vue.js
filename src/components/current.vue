<template>
  <div>
    <transition name="fade">
      <div v-if="this.$store.state.dataIsRecived" class="mb-4 container">
        <!-- ************center box *************-->

        <b-row class="m-auto order-2 weather-main-info">
          <b-col>
            <h2 class="m-2">{{ current.name }}</h2>
            <p>{{ date(current.dt) }}</p>
            <i :class="current | classWICurrent" class="wi m-5"></i>
            <p class="weather-description">
              {{ current.weather[0].description }}
            </p>
            <p class="mb-0 current-temp">
              {{ Math.round(current.main.temp) }} °C
            </p>
            <p>Odczucie {{ Math.round(current.main.feels_like) }} °C</p>
          </b-col>
        </b-row>

        <!-- *************left box*************** -->

        <b-row class="order-1 mt-3 details-box">
          <b-col class="mb-2 p-2 weather-details">
            <b-row class="mb-2 p-2 border-item flex-center-mixin">
              <b-col cols="1" class="pl-3 pr-2 justify-content-start text-left">
                <i class="weather-details--size-wi wi wi-strong-wind"></i>
              </b-col>
              <b-col cols="6" class="text-left">Prędkość wiatru</b-col>
              <b-col class="justify-content-start text-right">
                {{ current.wind.speed }} m/s
              </b-col>
            </b-row>
            <b-row class="mb-2 p-2 border-item flex-center-mixin">
              <b-col cols="1" class="pl-3 pr-2 justify-content-start text-left">
                <i class="weather-details--size-wi wi wi-wind-direction"></i>
              </b-col>
              <b-col cols="6" class="text-left">Kierunek wiatru</b-col>
              <b-col class="justify-content-start text-right"
                >{{ direction(current.wind.deg) }}
              </b-col>
            </b-row>
            <b-row class="mb-2 p-2 border-item flex-center-mixin">
              <b-col cols="1" class="pl-3 pr-2 justify-content-start text-left">
                <i class="weather-details--size-wi wi wi-barometer"></i>
              </b-col>
              <b-col cols="6" class="text-left">Ciśnienie</b-col>
              <b-col class="justify-content-start text-right"
                >{{ current.main.pressure }} hPa
              </b-col>
            </b-row>

            <b-row class="pt-1 pr-2 pl-2 flex-center-mixin">
              <b-col cols="1" class="pl-3 pr-2 justify-content-start text-left">
                <i class="weather-details--size-wi wi wi-humidity"></i>
              </b-col>
              <b-col cols="6" class="text-left">Wilgotność</b-col>
              <b-col class="justify-content-start text-right">
                {{ current.main.humidity }} %
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <!-- *******right box **************-->

        <b-row class="order-3 mt-3 details-box">
          <b-col class="mb-2 p-2 weather-details">
            <b-row class="mb-2 p-2 border-item flex-center-mixin">
              <b-col cols="1" class="pl-3 pr-2 justify-content-start text-left">
                <i class="weather-details--size-wi wi wi-sunrise"></i>
              </b-col>
              <b-col cols="6" class="text-left">Wschód słońca</b-col>
              <b-col class="justify-content-start text-right">
                {{ sun(current.sys.sunrise) }}
              </b-col>
            </b-row>
            <b-row class="mb-2 p-2 border-item flex-center-mixin">
              <b-col
                cols="1"
                class="pl-3 pr-2 justify-content-start text-center"
              >
                <i class="weather-details--size-wi wi wi-sunset"></i>
              </b-col>
              <b-col cols="6" class="justify-content-start text-left"
                >Zachód słońca</b-col
              >
              <b-col class="justify-content-start text-right">
                {{ sun(current.sys.sunset) }}
              </b-col>
            </b-row>
            <b-row class="mb-2 p-2 border-item flex-center-mixin">
              <b-col
                cols="1"
                class="pl-3 pr-2 justify-content-start text-center"
              >
                <i
                  class="weather-details--size-wi wi wi-thermometer text-center m-auto"
                ></i>
              </b-col>
              <b-col cols="6" class="text-left">Max temp</b-col>
              <b-col class="justify-content-start text-right">
                {{ Math.round(current.main.temp_max) }} °C
              </b-col>
            </b-row>
            <b-row class="p-2 flex-center-mixin">
              <b-col
                cols="1"
                class="pl-3 pr-2 justify-content-center text-left"
              >
                <i
                  class="weather-details--size-wi wi wi-thermometer-exterior"
                ></i>
              </b-col>
              <b-col cols="6" class="text-left">Min temp</b-col>
              <b-col class="justify-content-start text-right">
                {{ Math.round(current.main.temp_min) }} °C
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </transition>
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
@import '../mixins/scss/animation_mixin.scss';

/** main info panel */
.container {
  @include flexCenter;
  overflow-x: inherit;
}
.weather-main-info {
  width: 40%;
  border-radius: 1.02rem 1.02rem 1.02rem 1.02rem;
  border: 0.6rem outset rgba(82, 142, 211, 0.3);
  box-shadow: 0.625rem 0.688rem 2.875rem 0 rgba(0, 0, 0, 0.63);

  .current-temp {
    font-size: 3rem;
  }
  .weather-description {
    font-size: 1.2rem;
  }
}

.wi {
  font-size: 8rem;
  @include flexCenter;
}

.weather-details--size-wi {
  font-size: 1.4rem;
}

/** details boxes right and left  */

.details-box {
  width: 30%;
  @include flexCenter;
  .weather-details {
    background: rgb(77, 42, 202, 0.5);
    border-radius: 1.02rem 1.02rem 1.02rem 1.02rem;
    border: 0.5rem outset rgba(82, 142, 211, 0.3);
    transform: scale(1);
    position: relative;
    z-index: 10;
    transition: transform 0.5s;
    &:hover {
      margin: auto;
      transform: scale(1.4);
      z-index: 14;
    }
    .border-item {
      border-bottom: 1px solid rgb(36, 63, 95);
    }
    .flex-center-mixin {
      @include flexCenter;
    }
  }
}

/**animation */

@include animation($clock: 1.5s);

/* media query*/

@media (max-width: 1024px) {
  .container {
    @include flexCenter;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 0;
    :nth-child(1n) {
      order: 2;
    }
  }
  .weather-main-info {
    width: 100%;
  }
  .details-box {
    width: 100%;
    margin: auto;
  }
}
</style>
