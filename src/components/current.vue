<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        v-if="dataIsReceived"
        class="container current-weather"
        role="region"
        aria-labelledby="weatheTitle"
      >
        <div class="current-weather__main">
          <div class="row justify-content-center">
            <div class="col">
              <h2 id="weatherTitle" class="m-2 current-weather__city">{{ current.name }}</h2>
              <p class="current-weather__date">{{ date(current.dt) }}</p>

              <i
                :class="classWICurrent(current)"
                class="wi m-5 current-weather__icon"
                aria-hidden="true"
              ></i>

              <p class="current-weather__description">{{ current.weather[0].description }}</p>

              <p class="mb-0 current-weather__temp" aria-live="polite">
                {{ Math.round(current.main.temp) }} °C
              </p>
              <p class="current-weather__feels-like" aria-live="polite">
                Odczucie {{ Math.round(current.main.feels_like) }} °C
              </p>
            </div>
          </div>
        </div>

        <div class="current-weather__details">
          <h3 class="visually-hidden">Szczegóły pogody</h3>

          <div class="current-weather__details-box">
            <div class="row w-100 g-0">
              <div class="col">
                <div class="current-weather__details-content">
                  <div class="px-2 py-3 current-weather__item">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i
                          class="current-weather__icon-small wi wi-strong-wind"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="col text-start">Prędkość wiatru</div>
                      <div class="col text-end" aria-live="polite">
                        {{ current.wind.speed }} m/s
                      </div>
                    </div>
                  </div>

                  <div class="px-2 py-3 current-weather__item">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i
                          class="current-weather__icon-small wi wi-wind-direction"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="col text-start">Kierunek wiatru</div>
                      <div class="col text-end" aria-live="polite">
                        {{ direction(current.wind.deg) }}
                      </div>
                    </div>
                  </div>

                  <div class="px-2 py-3 current-weather__item">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i
                          class="current-weather__icon-small wi wi-barometer"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="col text-start">Ciśnienie</div>
                      <div class="col text-end" aria-live="polite">
                        {{ current.main.pressure }} hPa
                      </div>
                    </div>
                  </div>

                  <div class="px-2 py-3 current-weather__item border-none">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i
                          class="current-weather__icon-small wi wi-humidity"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="col text-start">Wilgotność</div>
                      <div class="col text-end" aria-live="polite">
                        {{ current.main.humidity }} %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="current-weather__details-box">
            <div class="row w-100 g-0">
              <div class="col">
                <div class="current-weather__details-content">
                  <div class="px-2 py-3 current-weather__item">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i class="current-weather__icon-small wi wi-sunrise" aria-hidden="true"></i>
                      </div>
                      <div class="col text-start">Wschód słońca</div>
                      <div class="col text-end">{{ sun(current.sys.sunrise) }}</div>
                    </div>
                  </div>

                  <div class="px-2 py-3 current-weather__item">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i class="current-weather__icon-small wi wi-sunset" aria-hidden="true"></i>
                      </div>
                      <div class="col text-start">Zachód słońca</div>
                      <div class="col text-end">{{ sun(current.sys.sunset) }}</div>
                    </div>
                  </div>

                  <div class="px-2 py-3 current-weather__item">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i
                          class="current-weather__icon-small wi wi-thermometer"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="col text-start">Max temp</div>
                      <div class="col text-end" aria-live="polite">
                        {{ Math.round(current.main.temp_max) }} °C
                      </div>
                    </div>
                  </div>

                  <div class="px-2 py-3 current-weather__item border-none">
                    <div class="row align-items-center">
                      <div class="col-1 col-md-1">
                        <i
                          class="current-weather__icon-small wi wi-thermometer-exterior"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div class="col text-start">Min temp</div>
                      <div class="col text-end" aria-live="polite">
                        {{ Math.round(current.main.temp_min) }} °C
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'

import useDateSettings from '../mixins/js/date_settings'
import WiIcon from '@/mixins/js/wi_icon'

export default {
  name: 'CurrentComponent',

  setup() {
    const weatherStore = useWeatherStore()

    // Importing functions from mixin to format date and sunrise/sunset time
    const { date, sun } = useDateSettings()

    // Importing an object from mixin that contains a function to generate
    // a weather icon class name based on the current weather condition
    const { classWICurrent } = WiIcon()

    // Computed property to get current weather from Pinia
    const current = computed(() => weatherStore.currentWeather)
    const dataIsReceived = computed(() => weatherStore.dataIsReceived)

    // Array wind direction
    const directionsArray = [
      { min: 350, max: 360, name: 'pólnoc' },
      { min: 0, max: 30, name: 'pólnoc' },
      { min: 31, max: 70, name: 'pólnocny wschód' },
      { min: 71, max: 110, name: 'wschód' },
      { min: 111, max: 160, name: 'południowy wschód' },
      { min: 161, max: 190, name: 'południe' },
      { min: 191, max: 250, name: 'południowy zachód' },
      { min: 251, max: 290, name: 'zachód' },
      { min: 291, max: 350, name: 'północny zachód' },
    ]

    // Method to determine wind direction
    const direction = (direction) => {
      for (const i of directionsArray) {
        if (direction >= i.min && direction <= i.max) {
          return i.name
        }
      }
    }

    return {
      dataIsReceived,
      current,
      direction,
      sun,
      date,
      classWICurrent,
    }
  },
}
</script>

<style lang="scss" scoped>
@use '../style/variable.scss' as *;
@use '../mixins/scss/flex_mixin.scss' as *;
@use '../mixins/scss/animation_mixin.scss' as *;

@include animation($clock: 1.5s);

.current-weather {
  @include flexCenter;
  gap: 6rem;
  margin-bottom: 3rem;
}

.current-weather__main {
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.6rem outset rgba(82, 142, 211, 0.4);
  box-shadow: 0.625rem 0.688rem 2.875rem 0 rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.current-weather__city {
  font-size: $font-size-big-p;
  font-weight: bold;
  text-align: center;
}
.current-weather__date,
.current-weather__description,
.current-weather__feels-like {
  font-size: $font-size-standard-p;
  text-align: center;
}
.current-weather__temp {
  font-size: $font-size-very-big-p;
  font-weight: bold;
}

.current-weather__details {
  width: 100%;
  @include flexCenter;
  flex-direction: column;
  gap: 1rem;
}

.current-weather__details-box {
  width: 100%;
  @include flexCenter;
}

.current-weather__details-content {
  background: rgba(77, 42, 202, 0.5);
  border-radius: 1rem;
  border: 0.5rem solid rgba(82, 142, 211, 0.3);
  padding: 0 1rem;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.current-weather__item {
  border-bottom: 1px solid rgb(36, 63, 95);
}

.border-none {
  border: none !important;
}

.wi {
  font-size: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.current-weather__icon-small {
  font-size: 1.6rem;
  margin-right: 0.5rem;
}

.current-weather__details-content:focus-within {
  outline: 3px solid rgba(255, 255, 255, 0.7);
}

@media (max-width: 1024px) {
  .container {
    @include flexCenter;
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .current-weather__temp {
    font-size: 2rem;
  }
  .wi {
    font-size: 6rem;
  }
  .current-weather__icon-small {
    font-size: 1.2rem;
  }
}
</style>
