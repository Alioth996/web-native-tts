<template>
  <el-form :model="ttsForm" :rules="ttsRules" ref="ttsFormRef">
    <el-form-item class="w300px" prop="text">
      <el-input v-model="ttsForm.text" type="textarea" placeholder="Type anything..." :rows='5' />
    </el-form-item>
    <el-form-item>
      <div class="flex justify-center flex-col w300px items-center">
        <el-tag class="w50px">语速</el-tag>
        <el-slider v-model="ttsForm.rate" :step="0.5" :min="0.5" :max="2" show-stops />
      </div>
    </el-form-item>

    <el-form-item>
      <div class="flex justify-center flex-col w300px items-center">
        <el-tag class="w50px ">音高</el-tag>
        <el-slider v-model="ttsForm.pitch" :step="0.1" :min="0" :max="2" />
      </div>
    </el-form-item>

    <el-form-item>
      <div class="flex justify-center flex-col w300px items-center">
        <el-tag class="w50px ">音量</el-tag>
        <el-slider v-model="ttsForm.volume" :step="1" :min="0" :max="100" />
      </div>
    </el-form-item>

    <el-form-item>
      <el-select v-model=" voicer" class="w300px" placeholder="选择语种" size="large">
        <el-option v-for="item in speakerList" :key="item.speaker" :label="item.label" :value="item.speaker" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="w300px" @click="handleSpeak(ttsFormRef)">Speak It!</el-button>
    </el-form-item>
  </el-form>

  <!-- 语音播放的背景 -->
  <div class="w-screen h-screen speak-bg-box" v-show="isSpeak"></div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

const ttsFormRef = ref()

let isSpeak = ref(false)

const ttsForm = reactive({
  rate: 1,
  text: '云深不知处',
  pitch: 1,
  volume: 50
})

const ttsRules = reactive({
  text: [
    { required: true, message: 'Please input...', trigger: 'blur' },
    { min: 1, message: 'Min Length should be 1', trigger: 'blur' },
  ],
})
// 配音人员
const voicer = ref('Yunxi')
// option列表
let speakerList = reactive([])

const handleSpeak = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (synth.speaking) {
        console.error('语音正在播放,请勿重复操作!!')
        return
      }
      voiceSpeak()
    } else {
      console.log('请填写完整表单项...', fields)
    }
  })
}


// 全局 speechSynthesis 语音对象
const synth = window.speechSynthesis

// chinese tts spi list instance
let voiceCNList = []

onMounted(() => {
  initSynth()

})

// 初始化语音api
const initSynth = () => {
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => {
      // 提取zh-cn 语音
      voiceCNList = synth.getVoices().filter(x => x.lang.includes('zh'))
      voiceCNList.map(x => {
        speakerList.push({
          speaker: `${getVoiceName(x)}`,
          label: `${x.lang}(${getVoiceName(x)})`
        })
      }
      )
    }
  }
}

// 播放语音队列
const voiceSpeak = () => {
  const ttsTextList = [
    `我叫${voicer.value}`,
    "很高兴为您提供语音服务",
    "listening"
  ]
  ttsTextList.push(ttsForm.text)

  ttsTextList.map(x => {
    const speakUtt = new SpeechSynthesisUtterance(x)
    voiceCNList.map(voice => {
      if (getVoiceName(voice) == voicer.value) {
        console.log('Current CV:', voicer.value)
        speakUtt.voice = voice
      }
    })

    speakUtt.pitch = ttsForm.pitch
    speakUtt.rate = ttsForm.rate
    speakUtt.volume = (ttsForm.volume / 100).toFixed(1)


    synth.speak(speakUtt)
    isSpeak.value = true


    speakUtt.addEventListener('start', e => console.log('语音播放中...'))
    speakUtt.addEventListener('error', e => {
      console.error('出错了!!', e)
    })

    // 结束语音和背景动画
    speakUtt.addEventListener('end', e => {
      if (!synth.speaking) {
        console.log('语音播放结束!')
        isSpeak.value = false
        return
      }
    })

  })


  // const ttsUttrance = new SpeechSynthesisUtterance(ttsForm.text)

  // // option 语音语种与 api绑定
  // voiceCNList.map(voice => {
  //   if (getVoiceName(voice) == voicer.value) {
  //     console.log('当前配音员:', voicer.value)
  //     ttsUttrance.voice = voice
  //   }
  // })

  // // ttsUttrance.voice = voicer.value
  // // console.log(voicer.value);
  // ttsUttrance.pitch = ttsForm.pitch
  // ttsUttrance.rate = ttsForm.rate

  // // synth.speak(speakerSelfUtt)
  // synth.speak(ttsUttrance)
  // ttsUttrance.addEventListener('start', e => console.log('语音播放中...'))
  // ttsUttrance.addEventListener('error', e => console.error('出错了!!', e))
  // ttsUttrance.addEventListener('end', e => console.log('语音播放结束!'))

}


const getVoiceName = ({ name }) => name.split(' ')[1]
</script>

<style scoped>
.speak-bg-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -999;
  background: url('@/assets/speak.gif') no-repeat center center/cover;
}
</style>