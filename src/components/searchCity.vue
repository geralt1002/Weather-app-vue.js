<template>
  <div>
    <b-container fluid="sm">
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
            >Nie znaleziono miasta, proszę spróbować jeszcze raz</b-alert
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
    </b-container>
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
.form-search-input {
  font-size: 1.7rem;
}
.error {
  margin-bottom: 0.3rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
