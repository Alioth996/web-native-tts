<template>
  <el-form :model="ttsForm">
    <el-form-item class="w300px">
      <el-input v-model="ttsForm.text" type="textarea" placeholder="Type anything..." :rows='5' />
    </el-form-item>
    <el-form-item>
      <div class="flex justify-center flex-col w300px items-center">
        <el-tag class="w50px">语速</el-tag>
        <el-slider v-model="ttsForm.rate" :step="0.5" :min="0" :max="2" show-stops />
      </div>
    </el-form-item>

    <el-form-item>
      <div class="flex justify-center flex-col w300px items-center">
        <el-tag class="w50px ">音量</el-tag>
        <el-slider v-model="ttsForm.pitch" :step="1" :min="0" :max="100" />
      </div>
    </el-form-item>

    <el-form-item>
      <el-select v-model="voice" class="w300px" placeholder="选择语种" size="large">
        <el-option v-for="item in voicesList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Speak It!</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'


const ttsForm = reactive({
  rate: 1,
  text: '',
  pitch: 50
})
// 选择的语音
const voice = ref('')
// 所有语种和配音人员列表
let voicesList = [{
  value: 'zh-cn',
  label: 'huhu',
}]


const onSubmit = () => {
  console.log('submit!')
}

const synth = window.speechSynthesis
const voices = synth.getVoices()

console.log(voices);

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = synth.getVoices
}
onMounted(() => {
  const synth = window.speechSynthesis
  const voices = synth.getVoices()

  console.log(voices);
  voices.map(x => {
    console.log(x);

    voicesList.push({
      value: x.lang + getVoiceName(x),
      label: x.lang + getVoiceName(x)
    })
  })

})



const getVoiceName = ({ name }) => name.split(' ')[1]
</script>
