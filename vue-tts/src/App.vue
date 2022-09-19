<template>
  <div id="speech-container" class="flex flex-col w400px  
  h-screen min-w-360px bg-dark items-center">
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
}
</style>
