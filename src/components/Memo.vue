<template>
    <textarea v-model="memo" placeholder="备忘录"></textarea>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount, onBeforeUnmount } from 'vue';
import debounce from 'lodash/debounce'

const memo = ref('');

const saveMemoDebounced = debounce(() => {
    if (window.environment === 'extension') {
        chrome.storage.local.set({ 'memo': memo.value })
    }
    else {
        localStorage.setItem('memo', memo.value);
    }
}, 1000 * 5)


watch(() => memo.value, saveMemoDebounced)

onBeforeMount(async () => {
    if (window.environment === 'extension') {
        const result = await chrome.storage.local.get('memo');
        memo.value = result.memo || '';
    }
    else {
        const text = localStorage.getItem('memo')
        memo.value = text || '';
    }
})
onBeforeUnmount(() => {
    saveMemoDebounced.flush()
})
window.addEventListener('beforeunload', () => {
    saveMemoDebounced.flush()
});
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