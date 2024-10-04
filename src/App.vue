<template>
  <Background />

  <div style="margin-top: 50px;">
    <Clock />
  </div>
  <div style="margin-top: 20px;">
    <SearchEngineContainer />
  </div>
  <div style="margin-top: 50px;">
    <BookmarkContainer />
  </div>

  <Settings />
</template>

<script setup lang="ts">
defineOptions({
  name: 'App'
})

import Background from './components/Background.vue'
import Clock from './components/Clock.vue'
import SearchEngineContainer from './components/SearchEngineContainer.vue'
import BookmarkContainer from './components/BookmarkContainer.vue'
import Settings from './components/Settings.vue'

</script>

<style scoped></style>
