<template>
  <div class="d-flex">
    <b-container
      fluid="sm"
      class="d-flex"
      v-if="this.$store.state.dataIsRecived"
    >
      <a class="btn btn_left" @click="swipeLeft">
        <font-awesome-icon icon="caret-left" />
      </a>
      <b-row
        class="container d-flex flex-nowrap mt-2"
        id="content"
        ref="content"
      >
        <b-col
          cols="2"
          class="ml-1 mr-5"
          v-for="forecast in forecast"
          :key="forecast.dt"
        >
          <p class="m-3 flex-center">{{ time(forecast.dt) }}</p>
          <i :class="forecast | classWIForecast" class="flex-center wi m-3"></i>
          <p class="m-3 flex-center">{{ Math.round(forecast.main.temp) }}°C</p>
        </b-col>
      </b-row>
      <a class="btn btn_right" @click="swipeRight">
        <font-awesome-icon icon="caret-right" />
      </a>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateSettings } from '../mixins/js/date_settings'
import { WiIcon } from '../mixins/js/wi_icon_mixin'

export default {
  mixins: [dateSettings, WiIcon],
  name: 'forecast',
  data() {
    return {}
  },
  computed: {
    ...mapState({ forecast: 'forecastWeather' }),
  },
  methods: {
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft
      if (
        !(
          (scrollPos === 0 || scrollPixels > 0) &&
          (element.clientWidth + scrollPos === element.scrollWidth ||
            scrollPixels < 0)
        )
      ) {
        const startTime =
          'now' in window.performance ? performance.now() : new Date().getTime()

        function scroll(timestamp) {
          const timeElapsed = timestamp - startTime
          const progress = Math.min(timeElapsed / duration, 1)
          element.scrollLeft = scrollPos + scrollPixels * progress

          if (timeElapsed < duration) {
            window.requestAnimationFrame(scroll)
          } else {
            return
          }
        }
        window.requestAnimationFrame(scroll)
      }
    },
    swipeLeft() {
      const content = this.$refs.content
      this.scrollTo(content, -8000, 800)
    },
    swipeRight() {
      const content = this.$refs.content
      this.scrollTo(content, 8000, 800)
    },
  },
}
</script>
<style lang="scss">
@import '../mixins/scss/flex_mixin.scss';
.flex-center {
  @include flexCenter;
}
.wi {
  font-size: 2rem;
}
.container {
  overflow-x: auto;
}
.btn {
  @include flexCenter;
  cursor: pointer;
  margin: auto;
  padding: 0.1em;
  z-index: 10;
  font-size: 3em;
  background: none;
}
</style>
