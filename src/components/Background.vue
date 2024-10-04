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
    // if (window.environment === 'extension') {
    //     backgroundStore.backgroundSettings = (await chrome.storage.local.get('backgroundSettings')).backgroundSettings
    // }
    // else {
    const backgroundSettings = localStorage.getItem('backgroundSettings')
    if (backgroundSettings) {
        backgroundStore.backgroundSettings = JSON.parse(backgroundSettings)
    }
    else {
        backgroundStore.backgroundSettings = {
            randomBackground: true,
            backgroundList: [
                {
                    used: true,
                    path: './images/backgrounds/到账锦鲤一对请查收.png'
                },
                {
                    used: true,
                    path: './images/backgrounds/月圆龙腾山河间.png'
                },
                {
                    used: true,
                    path: './images/backgrounds/湖心小屋.png'
                },
                {
                    used: true,
                    path: './images/backgrounds/锦鲤护体.png'
                },
                {
                    used: true,
                    path: './images/backgrounds/青松山下与满月.png'
                },
                {
                    used: true,
                    path: './images/backgrounds/黛.png',
                }
            ],
            currentBackgroundPath: '',
            defaultBackgroundPath: './images/backgrounds/黛.png'
        }
        localStorage.setItem('backgroundSettings', JSON.stringify(backgroundStore.backgroundSettings))
        console.log('初始化背景数据')
    }
    // }

    if (backgroundStore.backgroundSettings.randomBackground) {
        console.log(backgroundStore.backgroundSettings.backgroundList)
        const usedList = backgroundStore.backgroundSettings.backgroundList.filter(item => item.used)
        if (usedList.length > 0) {
            let randomIndex = Math.floor(Math.random() * backgroundStore.backgroundSettings.backgroundList.length)
            while (!backgroundStore.backgroundSettings.backgroundList[randomIndex].used) {
                randomIndex = Math.floor(Math.random() * backgroundStore.backgroundSettings.backgroundList.length)
            }
            backgroundStore.backgroundSettings.currentBackgroundPath = backgroundStore.backgroundSettings.backgroundList[randomIndex].path
        }
        else {
            alert('没有可用的背景图片')
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