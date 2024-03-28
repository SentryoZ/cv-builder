<template>
  <div>
    <v-container>
      <div class="v-row">
        <div class="v-col-8">
          <div class="d-flex flex-column">
            <div class="flex-1-1">
              <a>Padding Top: </a>
              <v-text-field
                v-model="paddingTop"
                suffix="px"
                @change="saveResumeData(resumeData)"
              />
            </div>
            <div class="flex-1-1">
              <a>Padding Bottom: </a>
              <v-text-field
                v-model="paddingBottom"
                suffix="px"
                @change="saveResumeData(resumeData)"
              />
            </div>
            <div class="flex-1-1">
              <a>Text Color: </a>
              <v-color-picker
                hide-canvas
                hide-inputs
                v-model="resumeData.options['text-color']"
                @change="saveResumeData(resumeData)"
              />
            </div>
            <div class="flex-1-1">
              <a>Primary Color: </a>
              <v-color-picker
                hide-canvas
                hide-inputs
                v-model="resumeData.options['primary-color']"
                @change="saveResumeData(resumeData)"
              />
            </div>
          </div>
        </div>
        <!--        <div class="flex-1-1">-->
        <!--          <pre> {{ debugData }}</pre>-->
        <!--        </div>-->
        <div class="v-col-4">
          <preview-resume></preview-resume>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style></style>

<script>
import initResumeData from "@/config/initResumeData";
import PreviewResume from "@/components/Builder/PreviewResume.vue";

export default {
  name: "resumeBuilder",
  components: {PreviewResume},
  data() {
    return {
      resumeData: {},
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
