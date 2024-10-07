<template>
    <Teleport to="body">
        <img :src="backgroundStore.backgroundSettings.currentBackgroundPath" alt="" />
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue"
import { useBackgroundStore } from "@/store/background"
defineOptions({
    name: "BackGround"
})

const backgroundStore = useBackgroundStore()

onBeforeMount(async () => {
    if (window.environment === 'extension') {
        const { backgroundSettings } = await chrome.storage.local.get('backgroundSettings')
        backgroundStore.backgroundSettings = JSON.parse(backgroundSettings)
    }
    else {
        const backgroundSettings = localStorage.getItem('backgroundSettings')
        if (backgroundSettings) {
            backgroundStore.backgroundSettings = JSON.parse(backgroundSettings)
        }
        else {
            backgroundStore.backgroundSettings = backgroundStore.defaultBackgroundSettings
            localStorage.setItem('backgroundSettings', JSON.stringify(backgroundStore.backgroundSettings))
            console.log('默认背景数据')
        }
    }

    if (backgroundStore.backgroundSettings.randomBackground) {
        const usedList = backgroundStore.backgroundSettings.backgroundList.filter(item => item.used)
        if (usedList.length > 0) {
            const randomIndex = Math.floor(Math.random() * usedList.length)
            backgroundStore.backgroundSettings.currentBackgroundPath = usedList[randomIndex].path
        }
        else {
            alert('没有可用的背景图片')
            backgroundStore.backgroundSettings.currentBackgroundPath = backgroundStore.defaultBackgroundSettings.defaultBackgroundPath
        }
    }
    else {
        backgroundStore.backgroundSettings.currentBackgroundPath = backgroundStore.backgroundSettings.defaultBackgroundPath
    }
})
</script>

<style scoped>
img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
}
</style>