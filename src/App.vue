<template>
  <Background />

  <main>
    <div class="Clock">
      <Clock />
    </div>
    <div class="SearchEngineContainer">
      <SearchEngineContainer />
    </div>
    <div class="Memo">
      <Memo />
    </div>
    <div class="BookmarkContainer">
      <BookmarkContainer />
    </div>
  </main>
  <Settings />
</template>

<script setup lang="ts">
defineOptions({
  name: 'App'
})

import Background from './components/Background.vue'
import Clock from './components/Clock.vue'
import SearchEngineContainer from './components/SearchEngineContainer.vue'
import Memo from './components/Memo.vue'
import BookmarkContainer from './components/BookmarkContainer.vue'
import Settings from './components/Settings.vue'

</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.Clock {
  margin-top: 50px;
}

.SearchEngineContainer {
  margin-top: 20px;
}

.Memo {
  margin: 10px 15% 10px 15%;
}

.BookmarkContainer {
  margin-top: 20px;
  margin-bottom: 20px;
  flex: 1;
  overflow: hidden;
}
</style>
