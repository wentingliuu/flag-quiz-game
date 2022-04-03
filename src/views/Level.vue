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
        class="level_list_item"
      >
        {{item.level}} {{item.country}}
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
      dummyData: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.dummyData = Json
    }
  }
}
</script>