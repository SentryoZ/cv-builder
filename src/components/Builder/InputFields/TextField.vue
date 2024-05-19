<script setup>

</script>

<template>
  <div>
    <v-text-field
      :model=inputData.value
      :name=inputData.name
      :label=inputData.name
      @change="updateTextInput($event)"
      v-bind="$attrs"
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
        value: this.content.value || null,
        name: this.content.name || null,
      }
    }
  },
  created() {
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
