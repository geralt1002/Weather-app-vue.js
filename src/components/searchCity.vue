<template>
  <div>
    <div>
      <b-form-group
        @submit.prevent="getWeather"
        id="fieldset-1"
        class="m-auto p-4 form-search-city"
        label="Wpisz nazwę miasta"
        label-for="input-1"
      >
        <transition name="fade">
          <b-alert
            class="error"
            @keyup="show = !show"
            v-if="isError"
            variant="danger"
            dismissible
            show
            >Nie znaleziono miasta</b-alert
          >
        </transition>
        <b-form-input
          id="input-1"
          v-model="searchCity"
          @keyup.enter.native="getWeather(searchCity)"
          class="form-search-input"
          placeholder="np. Warszawa"
          trim
        ></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      searchCity: null,
      error: null,
      show: true,
    }
  },
  methods: {
    ...mapActions({ getWeather: 'fetchWeather' }),
  },
  computed: {
    ...mapState(['isError']),
  },
}
</script>

<style scoped lang="scss">
@import '../mixins/scss/animation_mixin.scss';

.form-search-input {
  font-size: 1.7rem;
}
.error {
  margin-bottom: 0.3rem;
}

/**animation */

@include animation($clock: 0.5s);
</style>
