<template>
  <div>
    <v-container>
      <div class="v-row">
        <div class="v-col-6">
          <OptionsField :resumeData="resumeData" @save="saveResumeData"/>
          <div class="d-flex flex-column">
            <div v-for="(section, index) in resumeData.sections" :key="index">
              <BlockField :block="section" :level="0" :index="index" @updateInputData="updateInputData"></BlockField>
            </div>
          </div>
        </div>
        <div class="v-col-4">
          <div class="v-row">
            <v-switch
              v-model="showDebug"
              :label="`Show debug data: ${showDebug.toString()}`"
              hide-details
              inset
            ></v-switch>
            <pre v-if="showDebug"> {{ debugData }}</pre>
            <preview-resume
              v-else
              :resume-data="resumeData"
              :key="updateKey"
            ></preview-resume>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped></style>

<script>
import initResumeData from "@/config/initResumeData";
import PreviewResume from "@/components/Builder/PreviewResume.vue";
import BlockField from "@/components/Builder/InputFields/BlockField.vue";
import OptionsField from "@/components/Builder/OptionsField.vue";

export default {
  name: "resumeBuilder",
  components: {BlockField, PreviewResume, OptionsField},
  data() {
    return {
      resumeData: {},
      showDebug: true,
      updateKey: 0,
    };
  },
  created() {
    let resumeData = [];
    // Get form local storage
    let rawResumeData = localStorage.getItem("resume_data");
    if (rawResumeData === null || rawResumeData === undefined) {
      resumeData = initResumeData;
      localStorage.setItem("resume_data", JSON.stringify(resumeData));
    } else {
      resumeData = JSON.parse(rawResumeData);
    }

    // Validate cv data
    if (resumeData === null) {
      resumeData = this.saveResumeData(initResumeData);
    }
    // Validate cv options
    let options = resumeData["options"] ?? null;
    if (options === null) {
      resumeData = this.saveResumeData(initResumeData);
    }
    // //Todo: validate if have enough option key

    // Validate cv sections
    let sections = resumeData["sections"] ?? null;
    if (sections === null) {
      resumeData = this.saveResumeData(initResumeData);
    }

    this.resumeData = resumeData;
  },
  mounted() {
  },
  methods: {
    // save resume data to local storage
    saveResumeData(data) {
      this.resumeData = data;

      localStorage.setItem("resume_data", JSON.stringify(data));
      this.updateKey++;
      return data;
    },
    updateInputData(data) {
      console.log(data)
      console.log("outer level")
    }
  },
  computed: {
    debugData() {
      return JSON.stringify(this.resumeData, null, 2);
    },
  },
};
</script>
