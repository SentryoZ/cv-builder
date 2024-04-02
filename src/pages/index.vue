<template>
  <div>
    <v-container>
      <div class="v-row">
        <div class="v-col-6">
          <div class="d-flex flex-column">
            <div class="flex-1-1">
              <a>Padding X: </a>
              <v-text-field
                type="number"
                v-model="paddingTop"
                suffix="px"
                @change="saveResumeData(resumeData)"
              />
            </div>
            <div class="flex-1-1">
              <a>Padding Y: </a>
              <v-text-field
                type="number"
                v-model="paddingBottom"
                suffix="px"
                @change="saveResumeData(resumeData)"
              />
            </div>
            <div class="flex-1-1">
              <label for="textColor">Text Color: </label>
              <v-color-picker
                class="colorPicker"
                id="textColor"
                hide-inputs
                mode="hex"
                v-model="resumeData.options['text-color']"
                @change="saveResumeData(resumeData)"
              />
            </div>
            <div class="flex-1-1">
              <a>Primary Color: </a>
              <v-color-picker
                hide-inputs
                mode="hex"
                v-model="resumeData.options['primary-color']"
                @change="saveResumeData(resumeData)"
              />
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
            <preview-resume v-else :resume-data=resumeData></preview-resume>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped>

</style>

<script>
import initResumeData from "@/config/initResumeData";
import PreviewResume from "@/components/Builder/PreviewResume.vue";

export default {
  name: "resumeBuilder",
  components: {PreviewResume},
  data() {
    return {
      resumeData: {},
      showDebug: true
    };
  },
  methods: {
    // save resume data to local storage
    saveResumeData(data) {
      localStorage.setItem("resume_data", JSON.stringify(data));
      return data;
    },
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

    // // order options in resumeData
    // let orderedOptions = {
    //   "x": options["x"] + "px",
    //   "y": options["y"] + "px",
    //   "text-color": options["text-color"],
    //   "primary-color": options["primary-color"],
    // };
    // resumeData.options = orderedOptions;

    this.resumeData = resumeData;
  },
  mounted() {
  },
  computed: {
    paddingTop: {
      // get x value
      get() {
        return this.resumeData.options["x"].replace("px", "");
      },
      // set x value with px to cvData
      set(value) {
        this.resumeData.options["x"] = value + "px";
      },
    },
    paddingBottom: {
      // get y value
      get() {
        return this.resumeData.options["y"].replace("px", "");
      },
      // set y value with px to cvData
      set(value) {
        this.resumeData.options["y"] = value + "px";
      },
    },
    debugData() {
      return JSON.stringify(this.resumeData, null, 2);
    },
  },
};
</script>
