<template>
  <div>
    <div class="d-flex">
      <v-form @submit.prevent="saveCvData">
        <div class="d-flex flex-column">
          <div class="flex-1-1">
            <a>Padding Top: </a>
            <v-text-field
              v-model="options['padding-top']"
              :style="{ 'padding-top': options['padding-top'] }"
            />
          </div>
          <div class="flex-1-1">
            <a>Padding Bottom: </a>
            <v-text-field
              v-model="options['padding-bottom']"
              :style="{ 'padding-bottom': options['padding-bottom'] }"
            />
          </div>
          <div class="flex-1-1">
            <a>Text Color: </a>
            <v-color-picker
              v-model="options['text-color']"
              :style="{ color: options['text-color'] }"
            />
          </div>
          <div class="flex-1-1">
            <a>Primary Color: </a>
            <v-color-picker
              v-model="options['primary-color']"
              :style="{ 'background-color': options['primary-color'] }"
            />
          </div>
          <div class="flex-1-1">
            <button type="submit">Save</button>
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
      options: {
        "padding-top": "0px",
        "padding-bottom": "0px",
        "text-color": "#000000",
        "primary-color": "#000000",
      },
    };
  },
  methods: {
    saveCvData() {
      const updatecvData = { ...this.cvData, options: this.options };
      localStorage.setItem("cv_data", JSON.stringify(this.cvData));
      return updatecvData;
    },
  },
  mounted() {
    let cvData = [];
    // Get form local storage
    let rawCvData = localStorage.getItem("cv_data");
    if (rawCvData === null || rawCvData === undefined) {
      cvData = this.saveCvData(initCvData);
      localStorage.setItem("cv_data", JSON.stringify(cvData));
    } else {
      cvData = this.saveCvData(JSON.parse(rawCvData));
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
    //Todo: validate if have enough option key

    // Validate cv sections
    let sections = cvData["sections"] ?? null;
    if (sections === null) {
      cvData = this.saveCvData(initCvData);
    }

    this.cvData = cvData;
  },
  computed: {
    debugData() {
      return JSON.stringify(this.cvData, null, 2);
    },
  },
};
</script>
