<template>
  <div class="main">
    <div class="main_title">flag quiz game</div>
    <div class="main_country">
      <div class="name">{{ dummyData.country }}</div>
      <div class="continent">({{dummyData.continent}})</div>
    </div>

    <div
      v-if="!isSubmitted"
      :class="dummyData.showComponent"
      class="main_wrapper"
    >
      <div
        class="main_block"
        @mouseenter="mouseEnter()"
        @mouseleave="mouseLeave()"
      >
        <div
          v-for="(block, index) in blockColors"
          :key="index"
          :class="{active: currentBlock === index + 1}"
          class="block"
          :style="{'background-color': block, 'flex': dummyData.blockFlex[index]}"
          @click="changeBlockTo(index +1)"
        ></div>
      </div>

      <div class="main_color">
        <div 
          v-for="color in dummyData.colors"
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
    
    <router-link
      :to="{name: 'level', query: {id: dummyData.level}}"
      class="level_tab"
    >
      <font-awesome-icon icon="fa-solid fa-barcode" class="icon"/>
      <span>LEVEL</span>
    </router-link>
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
      cacheBlock: 0,
      currentBlock: 1,
      blockColors: ['', '', ''],
      btnDisabled: true,
      isSubmitted: false,
      showPopup: 'finished',
      dummyData: {}
    }
  },
  created() {
    const id = this.$route.params.id
    this.fetchData(id)
  },
  filters: {
    buttonText(value) {
      return (value === 'correct') ? 'next'
         : (value === 'wrong') ? 'back'
         : 'restart'
    }
  },
  methods: {
    fetchData(id) {
      this.dummyData = Json[id - 1]
      if (!this.dummyData) {
        this.$router.push({ name: 'entry'})
      }
    },
    addColor(color) {
      if (this.currentBlock === 0) return
      this.blockColors[this.currentBlock - 1] = color
      this.currentBlock ++

      if (this.currentBlock === 4) {
        this.currentBlock = 0
        this.btnDisabled = false
      }
    },
    changeBlockTo(id) {
      this.currentBlock = id
      this.blockColors[this.currentBlock - 1] = ''
    },
    mouseEnter() {
      this.cacheBlock = this.currentBlock
      this.currentBlock = 0
    },
    mouseLeave() {
      if (this.currentBlock !== 0) return
      this.currentBlock = this.cacheBlock
    },
    submitAnswer() {
      this.isSubmitted = true,
      this.btnDisabled = false
      if (JSON.stringify(this.blockColors) === JSON.stringify(this.dummyData.blockColors)) {
        if (this.dummyData.level === 24 ) {
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

      if (this.showPopup === 'correct') {
        const id = Number(this.$route.params.id) + 1
        this.$router.push({
          name: 'main',
          params: { id }
        })
        this.fetchData(id)
      } else if (this.showPopup === 'finished') {
        this.$router.push({ name: 'entry'})
      }
    }
  }
}
</script>