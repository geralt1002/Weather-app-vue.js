<template>
  <div class="mb-5">
    <h1 class="m-4 header-site">{{ headerSite }}</h1>

    <div class="container-fluid reset">
      <SearchCity />
      <Current />
      <Forecast />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SearchCity from '../components/searchCity.vue'
import Current from '../components/current.vue'
import Forecast from '../components/forecast.vue'

export default {
  name: 'HomeComponent',
  components: { SearchCity, Current, Forecast },

  setup() {
    const headerSite = ref('Sprawdź pogodę')

    return {
      headerSite,
    }
  },
}
</script>
<style lang="scss"></style>
