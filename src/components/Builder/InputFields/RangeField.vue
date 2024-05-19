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
      @change="updateTextInput($event)"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  props: {
    content: JSON,
    index: Number
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
    updateTextInput(event) {
      this.inputData.value = event.target.value;
      this.$emit('updateInputData', {value: this.inputData, id: this.index} );
    }
  }
}
</script>
