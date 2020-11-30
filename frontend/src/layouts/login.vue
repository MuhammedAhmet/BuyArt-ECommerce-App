<template>
  <div id="app">
    <span class="bg"></span>
    <v-app id="inspire">
      <v-content>
        <slot />
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {};
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("https://all4desktop.com/data_images/original/4237140-desktop-backgrounds.jpg")
    no-repeat center center;
  background-size: cover;
  transform: scale(1.1);
}
</style>
