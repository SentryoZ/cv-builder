<script setup>

</script>

<template>
  <div>
    <div class="preview-container" id="preview-container">
      <div class="resume-container align-content-start" id="resume-container">
        <div class="resume" :style="styles">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque est explicabo harum officiis sed temporibus
          voluptates. Blanditiis illum nisi odio quis voluptas! Cupiditate delectus dolorem eos eum illo laboriosam
          necessitatibus!
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume {
  min-height: 1056px;
  width: 816px;
  box-sizing: border-box;
  background: white;
  color: black;
}

.resume-container {
  transform-origin: left top;
}
</style>

<script>
export default {
  name: 'PreviewResume',
  props: {
    resumeData: {}
  },
  data() {
    return {
      styles: {}
    }
  },
  methods: {
    resizePreviewContainers() {
      const defaultWidth = 1920;
      const bodyWidth = document.documentElement.clientWidth
      const scale = bodyWidth / defaultWidth
      const newWidth = 816 * scale

      const previewContainer = document.getElementById('preview-container')
      const resumeContainer = document.getElementById('resume-container');

      previewContainer.style.width = newWidth + 'px';
      resumeContainer.style.transform = `scale(${scale})`; // Using transform scale for better scaling
    },
    handleStyle() {
      this.styles = {
        padding: this.resumeData.options.x + ' ' + this.resumeData.options.y,
        color: this.resumeData.options['text-color'],
        background: this.resumeData.options['primary-color'],
      }
    }
  },
  mounted() {
    this.resizePreviewContainers();
    window.addEventListener('resize', this.resizePreviewContainers);

    this.handleStyle()
  },
  beforeUnmount() {
    // Remove event listener when component is destroyed to prevent memory leaks
    window.removeEventListener('resize', this.resizePreviewContainers);
  },
}
</script>
