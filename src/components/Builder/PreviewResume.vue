<script setup>

</script>

<template>
  <div>
    <div class="preview-container">
      <div class="resume-container ml-0 d-inline" id="resume-container">
        <div class="resume" id="resume" style="scale: 1">

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
  transform: translateX(100%);
}
</style>

<script>
export default {
  name: 'PreviewResume',

  methods: {
    resizePreviewContainers() {
      const defaultWidth = 1920;
      const bodyWidth = document.documentElement.clientWidth; // Using documentElement.clientWidth for better accuracy
      const scale = bodyWidth / defaultWidth - 0.2; // Calculating scale factor inversely
      const newWidth = 816 * scale; // Adjusting the width based on the scale
      console.log('Scale:', scale, 'New Width:', newWidth);

      const resumeContainer = document.getElementById('resume-container');
      const resume = document.getElementById('resume');
      console.log('Resume Container:', resumeContainer, 'Resume:', resume);

      resumeContainer.style.width = newWidth + 'px';
      resume.style.transform = `scale(${scale})`; // Using transform scale for better scaling
    }


  },
  mounted() {
    // Call resizePreviewContainers function whenever component is mounted
    this.resizePreviewContainers();

    // Add event listener for window resize
    window.addEventListener('resize', this.resizePreviewContainers);
  },
  beforeUnmount() {
    // Remove event listener when component is destroyed to prevent memory leaks
    window.removeEventListener('resize', this.resizePreviewContainers);
  }

}
</script>
