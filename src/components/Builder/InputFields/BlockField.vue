<script setup>
import TextField from "@/components/Builder/InputFields/TextField.vue";
import TextAreaField from "@/components/Builder/InputFields/TextAreaField.vue";
import RangeField from "@/components/Builder/InputFields/RangeField.vue";
</script>

<template>
  <div :class=blockClass :style="{ 'margin-left': marginLevel }">
    <div>{{ block.name }}</div>
    <div v-for="(content, index) in block.contents" :key=index>
      <BlockField v-if="content.type === 'block'" :block=content :level=level+1></BlockField>
      <TextField v-else-if="content.type === 'text'" :content=content :index="index"
                 @updateInputData="updateInputData"></TextField>
      <TextAreaField v-else-if="content.type === 'textarea'" :content=content :index="index"
                     @updateInputData="updateInputData"></TextAreaField>
      <TextField v-else-if="content.type === 'image'" :content=content :index="index"
                 @updateInputData="updateInputData"></TextField>
      <RangeField v-else-if="content.type === 'range'" :content=content :index="index"
                  @updateInputData="updateInputData"></RangeField>
    </div>
  </div>
</template>

<style scoped>

</style>
<script>

export default {
  name: "BlockField",
  components: {},
  props: {
    block: JSON,
    level: {
      type: Number,
      default: 0
    },
    index: Number
  },
  data() {
    return {
      blockClass: null,
      marginLevel: '0px',
      blockData: this.block
    }
  },
  mounted() {
    this.handleBlockClass()
    this.handleBlockMargin()
  },
  methods: {
    handleBlockClass() {
      this.blockClass = this.block.width
    },
    handleBlockMargin() {
      this.marginLevel = (this.level * 10) + 'px'
    },
    updateInputData(data) {
      let index = data.index
      this.blockData.contents[index] = data.value
      console.log("Child Level: " + this.level)
      this.$emit('updateInputData', {value: this.blockData, index: this.index});
    }
  }
}

</script>
