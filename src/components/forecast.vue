<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="dataIsReceived" class="px-1 px-md-4 forecast">
        <div class="container forecast__wrapper">
          <div class="row">
            <div class="col-2 col-lg-1 d-none d-md-flex align-items-center justify-content-center">
              <button
                type="button"
                class="btn btn-scroll btn-scroll--left"
                @click="slidePrev"
                aria-label="Przewiń w lewo"
              >
                <img class="btn-scroll__icon" src="./icons/arrow-prev.svg" alt="Poprzedni slajd" />
              </button>
            </div>

            <div class="col-12 col-md-8 col-lg-10 mx-auto">
              <Splide ref="splide" :options="splideConfig" class="splide forecast__carousel">
                <SplideSlide
                  v-for="(forecastItem, index) in forecast"
                  :key="index"
                  class="forecast__slide"
                >
                  <div class="mx-1 forecast__item">
                    <p class="m-3 text-center forecast__date">{{ time(forecastItem.dt) }}</p>
                    <i
                      :class="classWIForecast(forecastItem)"
                      class="wi m-3 text-center"
                      aria-hidden="true"
                    ></i>
                    <p class="m-3 text-center forecast__temp">
                      {{ Math.round(forecastItem.main.temp) }}°C
                    </p>
                  </div>
                </SplideSlide>
              </Splide>

              <div class="forecast__progress">
                <div class="forecast__progress-bar" ref="progressBar"></div>
              </div>
            </div>

            <div class="col-2 col-lg-1 d-none d-md-flex align-items-center justify-content-center">
              <button
                type="button"
                class="btn btn-scroll btn-scroll--right"
                @click="slideNext"
                aria-label="Przewiń w prawo"
              >
                <img class="btn-scroll__icon" src="./icons/arrow-next.svg" alt="Następny slajd" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import { useWeatherStore } from '../stores/weatherStore.js'
import useDateSettings from '../mixins/js/date_settings'
import WiIcon from '../mixins/js/wi_icon'

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/sea-green'

export default {
  name: 'ForecastComponent',
  components: { Splide, SplideSlide },

  setup() {
    const weatherStore = useWeatherStore()
    const { time } = useDateSettings()
    const { classWIForecast } = WiIcon()
    const dataIsReceived = computed(() => weatherStore.dataIsReceived)
    const forecast = computed(() => weatherStore.forecastWeather)

    const splide = ref(null)
    const progressBar = ref(null)
    const progressBarWidth = ref('0%')

    // Configuration for the Splide carousel component
    const splideConfig = {
      type: 'slide', // The type of slider to use
      perPage: 6, // The number of slides to show on each page
      arrows: false, // Disable the default left and right arrow buttons
      pagination: false, // Disable the default pagination dots below the slider
      // Breakpoints for smaller screens
      // When the screen width is less than or equal to the key, the value is applied
      breakpoints: {
        // When the screen width is 1024px or less, show 4 slides per page
        1024: {
          perPage: 4,
        },
        // When the screen width is 768px or less, show 3 slides per page
        768: {
          perPage: 3,
        },
      },
    }

    // Function to navigate to the next slide in the Splide carousel
    const slideNext = () => {
      if (splide.value) splide.value.go('>')
    }
    // Function to navigate to the previous slide in the Splide carousel
    const slidePrev = () => {
      if (splide.value) splide.value.go('<')
    }

    const updateProgressBar = () => {
      // Check if splide or progressBar are not initialized
      if (!splide.value || !splide.value.splide || !progressBar.value) return

      // Get the current Splide instance
      const splideInstance = splide.value.splide

      // Calculate the total number of slides
      const end = splideInstance.Components.Controller.getEnd() + 1

      // Calculate how far along the current slide is in the carousel
      const rate = Math.min((splideInstance.index + 1) / end, 1)

      // Update the width of the progress bar based on the calculated rate
      progressBar.value.style.width = `${100 * rate}%`
    }

    // When the component is mounted, wait for the next tick in the event loop
    // Then, if the splide element is initialized, get the Splide instance
    // and add an event listener to the "mounted" and "move" events
    // The event listener will call the updateProgressBar function
    onMounted(() => {
      nextTick(() => {
        if (splide.value) {
          const splideInstance = splide.value.splide

          // The "mounted" event is fired when the Splide instance is created
          // The "move" event is fired when the user navigates to a different slide
          // By listening to these events, we can update the progress bar
          // whenever the user navigates to a different slide
          splideInstance.on('mounted move', updateProgressBar)

          // Call the updateProgressBar function immediately to set the initial width
          updateProgressBar()
        }
      })
      // console.log('ProgressBar element:', progressBar.value)
    })

    // Watcher to monitor changes to the `splide` reactive reference
    watch(
      () => splide.value, // Function to return the current value of `splide`
      (newSplide) => {
        // Callback function that is called when `splide` changes
        // Check if `newSplide` is truthy (i.e., has been initialized)
        if (newSplide) {
          // Get the Splide instance from the new `splide` object
          const splideInstance = newSplide.splide
          // Add event listeners to the Splide instance for 'mounted' and 'move' events
          // 'mounted' is triggered when Splide is fully initialized
          // 'move' is triggered when the user navigates to a different slide
          // These events will call the `updateProgressBar` function
          splideInstance.on('mounted move', updateProgressBar)

          // Call `updateProgressBar` immediately to set the correct progress bar width
          updateProgressBar()
        }
      },
    )

    return {
      dataIsReceived,
      forecast,
      time,
      classWIForecast,
      slidePrev,
      slideNext,
      splideConfig,
      splide,
      progressBarWidth,
      progressBar,
    }
  },
}
</script>

<style lang="scss" scoped>
@use '../style/variable.scss' as *;
@use '../mixins/scss/flex_mixin.scss' as *;
@use '../mixins/scss/animation_mixin.scss' as *;

.forecast {
  flex-direction: column;
  padding: 1rem;

  &__wrapper {
    width: 100%;
  }

  &__carousel {
    padding: 3rem;
    .forecast__date,
    .forecast__temp {
      font-size: $font-size-standard-p;
      font-weight: bold;
      color: #fff;
    }

    .wi {
      font-size: 3.5rem;
    }
  }

  &__progress {
    width: 100%;
    height: $carousel-progress-height;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    overflow: hidden;

    &-bar {
      width: 0;
      height: 100%;
      background-color: rgba(45, 175, 253, 1);
      transition: width 400ms ease;
    }
  }
}

.btn-scroll {
  height: $btn-scroll-height;
  cursor: pointer;
  margin: auto 0;
  padding: 0 0.5rem;
  z-index: 10;
  background: none;
  border: none;
  transition: transform 0.3s ease-in-out;

  &:hover,
  &:focus-visible {
    transform: scale(1.1);
    outline: 1px solid rgba(45, 175, 253, 1);
  }

  &--right:hover {
    box-shadow: 0.2rem 0 0 rgba(45, 175, 253, 1);
  }

  &--left:hover {
    box-shadow: -0.2rem 0 0 rgba(45, 175, 253, 1);
  }

  &__icon {
    width: 4rem;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
  }
}

@media (max-width: 512px) {
  .btn-scroll {
    height: 3rem;
    padding: 0 0.5rem;

    &__icon {
      width: 2rem;
    }
  }
}

@media (max-width: 576px) {
  .forecast__carousel {
    padding: 0;
  }
  .forecast__progress {
    margin-top: 1rem;
  }
}
</style>
