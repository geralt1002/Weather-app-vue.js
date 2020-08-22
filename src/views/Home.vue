<template>
  <div class="mb-5">
    <h1 class="m-4 header-site">{{ headerSite }}</h1>

    <b-container fluid="sm" class="reset">
      <searchCity />
      <current />
      <forecast />
    </b-container>
  </div>
</template>

<script>
import searchCity from '@/components/searchCity.vue'
import current from '@/components/current.vue'
import forecast from '@/components/forecast.vue'

export default {
  components: { searchCity, current, forecast },

  data() {
    return {
      headerSite: 'Sprawdź pogodę',
    }
  },
}
</script>
<style lang="scss">
.reset {
  padding: 0;
  margin: 0 auto;
}
</style>
