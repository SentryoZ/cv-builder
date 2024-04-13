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
      <TextField v-else-if="content.type === 'text'" :content=content @updateInput="updateInputdata"></TextField>
      <TextAreaField v-else-if="content.type === 'textarea'" :content=content @updateInput="updateInputdata"></TextAreaField>
      <TextField v-else-if="content.type === 'image'" :content=content></TextField>
      <RangeField v-else-if="content.type === 'range'" :content=content></RangeField>
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
    }
  },
  data() {
    return {
      blockClass: null,
      marginLevel: '0px'
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
    updateInputdata(data) {
      console.log(data)
      this.$emit('updatetextInput', data);
  }
}
}

</script>