<template>
  <div>
    <b-container fluid="sm">
      <b-form-group
        @submit.prevent="getWeather"
        id="fieldset-1"
        class="m-auto p-4 form-search-city"
        label="Wpisz nazwe miasta"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="searchCity"
          @keyup.enter.native="getWeather(searchCity)"
          class="form-search-input"
          placeholder="np. Warszawa"
          trim
        ></b-form-input>
      </b-form-group>
    </b-container>
  </div>
</template>

<script>
import store from '../store/index'
import { mapActions } from 'vuex'

export default {
  name: 'Weather',
  data() {
    return {
      searchCity: null,
    }
  },
  methods: {
    ...mapActions({ getWeather: 'fetchWeather' }),
  },
}
</script>

<style scoped lang="scss">
.form-search-input {
  font-size: 1.7rem;
}
</style>
