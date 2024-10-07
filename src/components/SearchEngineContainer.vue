<template>
    <div class="search-engine-container"
        :style="{ gridTemplateColumns: `repeat(${searchEngineContainerStore.searchEngineSettings.gridColumnCount}, 1fr)` }">
        <SearchEngineItem v-for="searchEngine in searchEngineContainerStore.searchEngineSettings.searchEngineList"
            :key="searchEngine.id" :openInNewTab="searchEngineContainerStore.searchEngineSettings.openInNewTab"
            :searchEngine="searchEngine" :getSearchSuggestions="bingSearchSuggestions" />
    </div>
</template>

<script setup lang="ts">
import SearchEngineItem from './SearchEngineItem.vue'
import { type SearchEngineInterface, type searchEngineSettingsInterface } from '@/types'
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import { useSearchEngineContainerStore } from '@/store/searchEngineContainer'
import { JsxEmit } from 'typescript'

defineOptions({
    name: 'SearchEngineContainer',
})

async function bingSearchSuggestions(keyword: string) {
    // 请求太频繁将暂时无法获取数据，所有用了try
    if (!keyword)
        return []
    const url = `https://api.bing.com/qsonhs.aspx` //https://sg1.api.bing.com/qsonhs.aspx?q=${keyword}
    const response = await axios.get(url, {
        withCredentials: false, // 禁用第三方 Cookie
        params: {
            q: keyword
        }
    })
    const vsSuggestions: string[] = [];
    const asSuggestions: string[] = [];
    try {
        response.data.AS.Results.forEach((result: any) => {
            if (result.Type === 'VS')
                vsSuggestions.push(...result.Suggests.map((s: any) => s.Txt))
            else if (result.Type === "AS") {
                asSuggestions.push(...result.Suggests.map((s: any) => s.Txt));
            }
        })
        const suggestions = [];
        const maxLength = Math.max(vsSuggestions.length, asSuggestions.length)
        for (let i = 0; i < maxLength; i++) {
            if (i < vsSuggestions.length)
                suggestions.push(vsSuggestions[i])
            if (i < asSuggestions.length)
                suggestions.push(asSuggestions[i])
        }
        return suggestions
    }
    catch (error: any) {
        console.log(`一般是请求太频繁导致获取数据失败:  ${error.message}`)
        return []
    }
}

const searchEngineContainerStore = useSearchEngineContainerStore()


onBeforeMount(async () => {
    if (window.environment === 'extension') {
        const { searchEngineSettings } = await chrome.storage.local.get('searchEngineSettings')
        searchEngineContainerStore.searchEngineSettings = JSON.parse(searchEngineSettings)
    }
    else {
        const searchEngineSettings = localStorage.getItem('searchEngineSettings')
        if (searchEngineSettings) {
            searchEngineContainerStore.searchEngineSettings = JSON.parse(searchEngineSettings)
        }
        else {
            searchEngineContainerStore.searchEngineSettings = searchEngineContainerStore.defaultSearchEngineSettings
            localStorage.setItem('searchEngineSettings', JSON.stringify(searchEngineContainerStore.searchEngineSettings))
            console.log('默认搜索引擎设置')
        }
    }
    console.log('读取搜索引擎设置成功')
})
</script>

<style scoped>
.search-engine-container {
    display: grid;
    gap: 2px 5px;
    margin-left: 5%;
    margin-right: 5%;
}

@media (max-width: 999px) {
    .search-engine-container {
        margin-left: 5%;
        margin-right: 5%;
    }
}

@media (min-width: 1000px) and (max-width: 1499px) {
    .search-engine-container {
        margin-left: 10%;
        margin-right: 10%;
    }
}

@media (min-width: 1500px) {
    .search-engine-container {
        margin-left: 15%;
        margin-right: 15%;
    }
}
</style>