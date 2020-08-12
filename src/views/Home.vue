<template>
  <div class="mb-5">
    <h1 class="m-4 header-site">{{ headerSite }}</h1>

    <searchCity />
    <current />
    <forecast />
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
<style lang="scss"></style>
