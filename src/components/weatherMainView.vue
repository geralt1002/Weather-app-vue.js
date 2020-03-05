<template>
  <div>
    <b-form-group
      id="fieldset-1"
      class=""
      label="Wpisz nazwe miasta"
      label-for="input-search"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
      <b-form-input
        id="input-search"
        class="w-50 m-auto p-4"
        :state="state"
        v-model="name"
        trim
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return this.name.length >= 1 ? true : false
    },
    invalidFeedback() {
      if (this.name.length > 1) {
        return ''
      } else if (this.name.length > 0) {
        return 'Wpisz min 1 znak'
      } else {
        return 'Wpisz coś'
      }
    },
    validFeedback() {
      return this.state === true ? 'Thx' : ''
    }
  },
  data() {
    return {
      name: 'np. Warszawa'
    }
  }
}
</script>

<style scoped lang="scss"></style>
