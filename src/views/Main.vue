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
          :class="color"
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
      class="main_button btn"
      :disabled="btnDisabled"
      @click="submitAnswer"
    >
      submit
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
      colors: ['red', 'orange', 'yellow', 'green', 'blue-light', 'blue', 'white', 'black'],
      blockColors: ['', '', ''],
      btnDisabled: true,
      isSubmitted: false,
      showPopup: 'finished',
      dummyData: Json
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
      if (JSON.stringify(this.blockColors) === JSON.stringify(this.dummyData[this.currentLevel].blockColors)) {
        console.log('Correct!')
        this.isSubmitted = true,
        this.btnDisabled = false,
        this.showPopup = 'correct'

      } else {
        console.log('false')
        this.isSubmitted = true,
        this.btnDisabled = false,
        this.showPopup = 'wrong'
      }
    }
  }
}
</script>