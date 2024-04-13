<script setup>

</script>

<template>
  <div>
    <v-text-field
      :model=inputData.value
      :name=inputData.name
      :label=inputData.name
      @input="updateTextInput($event)"
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
        value: this.content.value || null,
        name: this.content.name || null
      }
    }
  },
  created() {
    this.inputData = this.content
  },
  methods: {
    updateTextInput(event) {
      this.inputData.value = event.target.value;
      this.$emit('updateInput', this.inputData );
    }
  }
}
</script>
