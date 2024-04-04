<template>
  <div class="flex-1-1">
    <v-text-field
      label="Padding X"
      type="number"
      v-model="paddingTop"
      suffix="px"
      @change="saveResumeData"
    />
  </div>
  <div class="flex-1-1">
    <v-text-field
      label="Padding Y"
      type="number"
      v-model="paddingBottom"
      suffix="px"
      @change="saveResumeData"
    />
  </div>
  <div class="d-flex">
    <div class="flex-1-1">
      <v-text-field
        label="Text Color"
        type="color"
        v-model="textColor"
        @change="saveResumeData"
      />
    </div>
    <div class="flex-1-1">
      <v-text-field
        label="Background Color"
        type="color"
        v-model="backgroundColor"
        @change="saveResumeData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsField",
  props: ["resumeData"],
  emits: ["save"],
  data() {
    return {
      paddingTop: this.resumeData.options["x"].replace("px", ""),
      paddingBottom: this.resumeData.options["y"].replace("px", ""),
      textColor: this.resumeData.options["text-color"],
      backgroundColor: this.resumeData.options["primary-color"],
    };
  },
  methods: {
    saveResumeData() {
      const updatedResumeData = {
        ...this.resumeData, // getting data from resumeData
        options: {
          // updating options
          ...this.resumeData.options, // getting data from options
          x: this.paddingTop + "px", // updating and formatting x
          y: this.paddingBottom + "px",
          "text-color": this.textColor,
          "primary-color": this.backgroundColor,
        },
      };
      this.$emit("save", updatedResumeData);
    },
  },
};
</script>
