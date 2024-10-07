<template>
    <div class="clock">
        <div class="time">{{ formattedTime }}</div>
        <div class="date">{{ formattedDate }}</div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'Clock'
})
import { ref, computed, onMounted, onUnmounted } from 'vue'
const refreshInterval = 1000 * 10 // 10秒刷新一次

let currentDate = ref<Date>(new Date())
// 计算格式化的时间
let formattedTime = computed(() => {
    const hour = String(currentDate.value.getHours()).padStart(2, '0')
    const minute = String(currentDate.value.getMinutes()).padStart(2, '0')
    return `${hour}:${minute}`
})
// 计算格式化的日期
let formattedDate = computed(() => {
    const month = currentDate.value.getMonth() + 1
    const day = currentDate.value.getDate()
    return `${month}月${day}日`
})
// 更新当前时间
function updateCurrentDate() {
    currentDate.value = new Date()
}

let updateCurrentDateIntervel: ReturnType<typeof setInterval>
onMounted(() => {
    updateCurrentDate()
    updateCurrentDateIntervel = setInterval(updateCurrentDate, refreshInterval);
})
onUnmounted(() => {
    clearInterval(updateCurrentDateIntervel)
})
</script>

<style scoped>
.clock {
    text-align: center;
    color: white;
}

.time {
    font-size: 400%;
    font-weight: 500;
    margin: 0;
}

.date {
    font-size: 100%;
    font-weight: 400;
    margin: 10px 0 0 0;
}
</style>