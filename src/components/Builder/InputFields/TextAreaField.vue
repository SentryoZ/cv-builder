<script setup>

</script>

<template>
  <div>
    <v-textarea
      :model-value=inputData.value
      :name=inputData.name
      :label=inputData.name
    ></v-textarea>
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
    this.inputData = this.content
  }
}
</script>
