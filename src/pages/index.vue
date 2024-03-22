<template>
  <div>
    <div class="d-flex">
      <v-form @submit.prevent="saveCvData(cvData)">
        <div class="d-flex flex-column">
          <div class="flex-1-1">
            <a>Padding Top: </a>
            <v-text-field v-model="paddingTop" suffix="px" />
          </div>
          <div class="flex-1-1">
            <a>Padding Bottom: </a>
            <v-text-field v-model="paddingBottom" suffix="px"></v-text-field>
          </div>
          <div class="flex-1-1">
            <a>Text Color: </a>
            <v-color-picker
              hide-canvas
              hide-inputs
              v-model="cvData.options['text-color']"
            />
          </div>
          <div class="flex-1-1">
            <a>Primary Color: </a>
            <v-color-picker
              hide-canvas
              hide-inputs
              v-model="cvData.options['primary-color']"
            />
          </div>
          <div class="flex-1-1">
            <v-button type="submit">Save</v-button>
          </div>
        </div>
      </v-form>
      <div class="flex-1-1">Input component</div>
      <div class="flex-1-1">
        <pre> {{ debugData }}</pre>
      </div>
      <div class="flex-1-1">Preview component</div>
    </div>
  </div>
</template>

<style></style>

<script>
import initCvData from "@/config/initCvData";

export default {
  name: "cvBuilder",
  data() {
    return {
      cvData: {},
    };
  },
  methods: {
    // save cvdata to local storage
    saveCvData(data) {
      localStorage.setItem("cv_data", JSON.stringify(data));
      return data;
    },
  },
  created() {
    let cvData = [];
    // Get form local storage
    let rawCvData = localStorage.getItem("cv_data");
    if (rawCvData === null || rawCvData === undefined) {
      cvData = initCvData;
      localStorage.setItem("cv_data", JSON.stringify(cvData));
    } else {
      cvData = JSON.parse(rawCvData);
    }

    // Validate cv data
    if (cvData === null) {
      cvData = this.saveCvData(initCvData);
    }
    // Validate cv options
    let options = cvData["options"] ?? null;
    if (options === null) {
      cvData = this.saveCvData(initCvData);
    }
    // //Todo: validate if have enough option key

    // Validate cv sections
    let sections = cvData["sections"] ?? null;
    if (sections === null) {
      cvData = this.saveCvData(initCvData);
    }

    // // order options in cvdata
    // let orderedOptions = {
    //   "x": options["x"] + "px",
    //   "y": options["y"] + "px",
    //   "text-color": options["text-color"],
    //   "primary-color": options["primary-color"],
    // };
    // cvData.options = orderedOptions;

    this.cvData = cvData;
  },
  mounted() {},
  computed: {
    paddingTop: {
      // get x value
      get() {
        return this.cvData.options["x"].replace("px", "");
      },
      // set x value with px to cvData
      set(value) {
        this.cvData.options["x"] = value + "px";
      },
    },
    paddingBottom: {
      // get y value
      get() {
        return this.cvData.options["y"].replace("px", "");
      },
      // set y value with px to cvData
      set(value) {
        this.cvData.options["y"] = value + "px";
      },
    },
    debugData() {
      return JSON.stringify(this.cvData, null, 2);
    },
  },
};
</script>
