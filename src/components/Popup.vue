<template>
  <div 
    class="main_wrapper pop-up"
    :class="showPopup"
  >
      <div class="main_block">
      </div>

      <div class="main_color">
        {{ showPopup }}!
      </div>
    </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    showPopup: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  }
}
</script>