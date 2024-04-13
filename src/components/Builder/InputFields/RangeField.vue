<script setup>

</script>

<template>
  <div>
    <v-text-field
      :model-value=inputData.value
      :name=inputData.name
      :label=inputData.name
      type="number"
      min="0"
      max="100"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  props: {
    content: JSON
  },
  data() {
    return {
      inputData: {
        value: null,
        name: null
      }
    }
  },
  created() {
    console.log(this.content)
    this.inputData = this.content
  },
  methods: {
    }
}
</script>
