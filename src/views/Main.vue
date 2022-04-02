<template>
  <div class="main">
    <div class="main_title">flag quiz game</div>
    <div class="main_country">
      <div class="name">{{ dummyData[currentLevel].country }}</div>
      <div class="continent">({{dummyData[currentLevel].continent}})</div>
    </div>

    <div
      v-if="!isSubmitted"
      :class="dummyData[currentLevel].showComponent"
      class="main_wrapper"
    >
      <div class="main_block">
        <div
          v-for="(block, index) in blockColors"
          :key="index"
          :class="{active: currentBlock === index + 1}"
          class="block"
          :style="{'background-color': block}"
        ></div>
      </div>

      <div class="main_color">
        <div 
          v-for="color in colors"
          :key="color"
          class="color"
          :style="{'background-color': color}"
          @click="addColor(color)"
        >
        </div>
      </div>
    </div>

    <Popup
     v-else
     :show-popup="showPopup"
    />

    <button 
      v-if="!isSubmitted"
      class="main_button btn"
      :disabled="btnDisabled"
      @click="submitAnswer"
    >
      submit
    </button>

    <button 
      v-if="isSubmitted"
      class="main_button btn"
      @click="afterSubmit"
    >
      {{ showPopup | buttonText }}
    </button>

    <p class="copy-right">©2022 WENTING LIU</p>
  </div>
</template>

<script>
import Popup from '../components/Popup'
import Json from '../assets/dummyData.json'

export default {
  name: 'Main',
  components: {
    Popup
  },
  data() {
    return {
      currentLevel: 0,
      currentBlock: 1,
      colors: ['red', 'orange', 'yellow', 'green', 'DeepSkyBlue', 'blue', 'white', 'black'],
      blockColors: ['', '', ''],
      btnDisabled: true,
      isSubmitted: false,
      showPopup: 'finished',
      dummyData: Json
    }
  },
  filters: {
    buttonText(value) {
      return (value === 'correct') ? 'next'
         : (value === 'wrong') ? 'back'
         : 'restart'
    }
  },
  methods: {
    addColor(color) {
      if (this.currentBlock === 0) return
      this.blockColors[this.currentBlock - 1] = color
      this.currentBlock ++

      if (this.currentBlock === 4) {
        this.currentBlock = 0
        this.btnDisabled = false
      }
    },
    submitAnswer() {
      this.isSubmitted = true,
      this.btnDisabled = false
      if (JSON.stringify(this.blockColors) === JSON.stringify(this.dummyData[this.currentLevel].blockColors)) {
        if (this.currentLevel === 23 ) {
          return this.showPopup = 'finished'
        }
        this.showPopup = 'correct'
      } else {
        this.showPopup = 'wrong'
      } 
    },
    afterSubmit() {
      this.currentBlock = 1
      this.blockColors = ['', '', '']
      this.btnDisabled = true,
      this.isSubmitted = false

      if(this.showPopup === 'correct') {
        console.log('answer correct!')
        this.currentLevel++
      } else if (this.showPopup === 'wrong') {
        console.log('answer wrong!')
        this.isSubmitted = false,
        this.btnDisabled = true
      } else {
        console.log('finished!')
        this.currentLevel = 0
      }
    }
  }
}
</script>