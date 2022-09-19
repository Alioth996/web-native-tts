<template>
  <div id="speech-container">
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
  display: flex;
  margin: 0 auto;
  width: 360px;
  height: 100%;
  min-width: 320px;
  flex-direction: column;
  align-items: center;
}
</style>
