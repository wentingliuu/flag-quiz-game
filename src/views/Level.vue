<template>
  <div class="level">
    <div class="level_title">LEVEL</div>
    <div class="level_list">
      <!--
      <div 
        v-for="item in dummyData"
        :key="item.level"
        class="level_list_item"
      >
      {{item.level}} {{item.country}}
      </div>
      -->

      <router-link 
        v-for="item in dummyData"
        :to="{name: 'main', params: { id: item.level}}"
        :key="item.level"
        :class="{active: item.level === currentLevel, done: item.level < currentLevel}"
        class="level_list_item"
      >
        {{item.level}} {{item.country}} {{item.flag}}
      </router-link>

    </div>
    <button class="level_button">
      <router-link to="/">restart</router-link>
    </button>
  </div>
</template>

<script>
import Json from '../assets/dummyData.json'

export default {
  name: 'Level',
  data() {
    return {
      dummyData: {},
      currentLevel: 0
    }
  },
  created() {
    this.fetchData()
    this.currentLevel = this.$route.query.id
  },
  methods: {
    fetchData() {
      this.dummyData = Json
    }
  }
}
</script>