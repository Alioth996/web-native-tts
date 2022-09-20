<template>
  <div id="speech-container" class="flex flex-col w400px  
  h-screen min-w-360px  items-center">
    <Logo />
    <Speech />
  </div>
</template>

<script setup lang="ts">
import Speech from '@/components/Speech.vue'
import Logo from '@/components/Logo.vue';

</script>

<style scoped>
#speech-container {
  margin: 0 auto;
  background: #ee9ca7;
  border-radius: 5px;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(45deg, #ffdde1, #ee9ca7);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(45deg, #ffdde1, #ee9ca7);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
