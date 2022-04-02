<template>
  <div class="main">
    <div class="main_title">flag quiz game</div>
    <div class="main_country">
      <div class="name">belgium</div>
      <div class="continent">(europe)</div>
    </div>

    <div class="main_block">
      <div class="block one">one</div>
      <div class="block two">two</div>
      <div class="block three">three</div>
    </div>

    <div class="main_color">
      <div class="color red" style="background-color: var(--red);"></div>
      <div class="color orange" style="background-color: var(--orange);"></div>
      <div class="color yellow" style="background-color: var(--yellow);"></div>
      <div class="color green" style="background-color: var(--green);"></div>
      <div class="color blue-light" style="background-color: var(--blue-light);"></div>
      <div class="color blue" style="background-color: var(--blue);"></div>
      <div class="color white" style="background-color: var(--white);"></div>
      <div class="color black" style="background-color: var(--black);"></div>
    </div>

    <button class="main_button btn">
      submit
    </button>

    <p class="copy-right">©2022 WENTING LIU</p>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>