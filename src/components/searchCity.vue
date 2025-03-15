<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <form class="form-search-city" @submit.prevent="getWeather" role="search">
          <div id="fieldset-1" role="group" class="m-auto p-4 pb-0 form-search-city__group">
            <div class="form-search-city__input-wrapper">
              <label id="searchLabel" for="searchInput" class="form-search-city__label">
                Wpisz nazwę miasta
              </label>
              <div class="form-search-city__input-container">
                <input
                  id="searchInput"
                  v-model="searchCity"
                  type="text"
                  placeholder="np. Warszawa"
                  class="form-search-city__input"
                  aria-labelledby="searchLabel"
                  autocomplete="off"
                  required
                  tabindex="1"
                />
                <button
                  type="submit"
                  class="form-search-city__button"
                  aria-label="Szukaj miasta"
                  tabindex="2"
                >
                  Szukaj
                </button>
              </div>
            </div>
          </div>
        </form>

        <transition name="fade" mode="out-in">
          <div
            v-if="isError"
            class="form-search-city__error-container p-4 pt-2"
            role="alert"
            aria-live="polite"
          >
            <div class="alert alert-danger">
              <p class="m-0 form-search-city__error-message" tabindex="0">
                Nie znaleziono takiego miasta
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useWeatherStore } from '../stores/weatherStore'

export default {
  name: 'SearchComponent',
  setup() {
    const weatherStore = useWeatherStore()
    const searchCity = ref('')

    const isError = computed(() => weatherStore.isError)

    const getWeather = () => {
      if (searchCity.value.trim()) {
        // Check if the input is not empty
        weatherStore.fetchWeather(searchCity.value) // Pass the city name
      }
    }

    return {
      searchCity,
      isError,
      getWeather,
    }
  },
}
</script>

<style lang="scss" scoped>
@use '../style/variable.scss' as *;
@use '../mixins/scss/animation_mixin.scss' as *;
@use '../mixins/scss/flex_mixin.scss' as *;

// Animacja
@include animation($clock: 0.5s);

.form-search-city {
  margin: 1rem 0 6rem 0;

  &__group {
    width: 100%;
    max-width: 50rem;
    margin: auto;
    padding: 1rem;
  }

  &__input-wrapper {
    @include flexCenter;
    flex-direction: column;
  }

  &__label {
    font-size: $font-size-standard-p;
    margin-bottom: 0.5rem;
  }

  &__input-container {
    @include flexCenter;
    width: 100%;
    max-width: 50rem;
  }

  &__input {
    width: 100%;
    font-size: $font-size-medium-p;
    padding: 0.5rem;
    border: none;
    outline: 1px solid transparent;
    border-radius: 0.25rem 0 0 0.25rem;

    &:focus-visible {
      outline: 2px solid rgba(67, 0, 252, 1);
      outline-offset: -2px;
    }
  }

  &__button {
    @include transition($clock: 0.3s);
    font-size: $font-size-medium-p;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0 0.25rem 0.25rem 0;
    color: #fff;
    background-color: rgba(67, 0, 252, 1);

    &:hover {
      background-color: rgba(67, 0, 252, 0.6);
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
  }

  &__error-container {
    margin: 0 auto;
    max-width: 50rem;
    @include animation($clock: 0.5s);
  }

  &__error-message {
    margin-bottom: 0.3rem;
  }
}

// Media Queries
@media screen and (max-width: 768px) {
  .form-search-city {
    &__input {
      font-size: $font-size-standard-p;
      padding: 0.5rem;
    }

    &__button {
      font-size: $font-size-standard-p;
      padding: 0.5rem 1rem;
    }
  }
}
</style>
