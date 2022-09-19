// init SpeechSynth API 初始化语言api
const synth = window.speechSynthesis

// $ query element tag
const $ = el => document.querySelector(el)

// DOM Element
const textForm = $('form')
const textInput = $('#text-input')
const voiceSelect = $('#voice-select')
const rate = $('#rate')
const rateValue = $('#rate-value')
const pitch = $('#pitch')
const pitchValue = $('#pitch-value')

// Init voices array 语种和配音员列表
let voices = []

const getVoices = () => {
  // 原生api,获取浏览器支持的所有语种和配音人员
  voices = synth.getVoices()
  // 遍历添加option
  voices.map(voice => {
    //   Microsoft Huihui - Chinese
    const option = document.createElement('option')
    option.textContent = `(${voice.lang})-${getVoiceName(voice.name)}`

    option.setAttribute('data-lang', voice.lang)
    option.setAttribute('data-name', getVoiceName(voice.name))

    voiceSelect.appendChild(option)
  })
}

getVoices()

// 提取配音名字
const getVoiceName = voiceName => voiceName.split(' ')[1]

// 指定speech voice api 处理函数
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices
}

// 语音播放
const ttsSpeak = () => {
  if (synth.speaking) {
    console.error('语言播放中...')
    return
  }
  if (textInput.value !== '' && textInput.value.length != 0) {
    const speakUtt = new SpeechSynthesisUtterance(textInput.value)

    bindEventLisnter(speakUtt)
    const selectVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

    // option 语音语种与 api绑定
    voices.map(voice => {
      if (getVoiceName(voice.name) == selectVoice) {
        console.log('当前配音员:', selectVoice)
        speakUtt.voice = voice
      }
    })

    speakUtt.rate = rate.value
    speakUtt.pitch = pitch.value

    synth.speak(speakUtt)
  } else alert('Nothing to tts...')
}

// 绑定事件处理
const bindEventLisnter = el => {
  el.addEventListener('end', e => console.log('语音播放结束...'))
  el.addEventListener('error', e => console.error('出错了...'))
  el.addEventListener('start', e => console.log('语音播放中...'))
}

// 点击播放
textForm.addEventListener('submit', e => {
  e.preventDefault()
  ttsSpeak()
  textInput.blur()
})

// rate,pitch sync  value change
rate.addEventListener('change', e => (rateValue.innerText = rate.value))
pitch.addEventListener('change', e => (pitchValue.innerText = pitch.value))

// 选择voice直接播放,暂时不做
voiceSelect.addEventListener('change', e => ttsSpeak())
