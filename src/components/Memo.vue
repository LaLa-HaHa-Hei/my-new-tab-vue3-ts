<template>
    <textarea v-model="memo" placeholder="备忘录"></textarea>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import debounce from 'lodash/debounce'

const memo = ref('');


watch(memo, debounce(() => {
    if (window.environment === 'extension') {
        chrome.storage.local.set({ 'memo': memo.value })
    }
    else {
        localStorage.setItem('memo', memo.value)
    }
}, 1000 * 5))

onBeforeMount(async () => {
    if (window.environment === 'extension') {
        memo.value = (await chrome.storage.local.get('memo')).memo
    }
    else {
        const text = localStorage.getItem('memo')
        if (text) {
            memo.value = text
        }
        else {
            localStorage.setItem('memo', '')
        }
    }
})

</script>

<style scoped>
textarea {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    padding: 10px;
    font-size: 200%;
    font-weight: bold;
    outline: none;
}
</style>