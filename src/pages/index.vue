<template>
  <div>
    <div class="d-flex">
      <v-form @submit.prevent="saveCvData(cvData)">
        <div class="d-flex flex-column">
          <div class="flex-1-1">
            <a>Padding Top: </a>
            <v-text-field
              v-model="cvData.options['padding-top']"
            />
          </div>
          <div class="flex-1-1">
            <a>Padding Bottom: </a>
            <v-text-field
              v-model="cvData.options['padding-bottom']"
            />
          </div>
          <div class="flex-1-1">
            <a>Text Color: </a>
            <v-color-picker
              v-model="cvData.options['text-color']"
            />
          </div>
          <div class="flex-1-1">
            <a>Primary Color: </a>
            <v-color-picker
              v-model="cvData.options['primary-color']"
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
    };
  },
  methods: {
    saveCvData(data) {
      localStorage.setItem("cv_data", JSON.stringify(data));
      return data
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

    this.cvData = cvData;
  },
  mounted() {
  },
  computed: {
    debugData() {
      return JSON.stringify(this.cvData, null, 2);
    },
  },
};
</script>
