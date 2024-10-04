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
    // if (window.environment === 'extension') {
    //     searchEngineContainerStore.searchEngineSettings = (await chrome.storage.local.get('searchEngineSettings')).searchEngineSettings
    // }
    // else {
    const searchEngineSettings = localStorage.getItem('searchEngineSettings')
    if (searchEngineSettings) {
        searchEngineContainerStore.searchEngineSettings = JSON.parse(searchEngineSettings)
    }
    else {
        searchEngineContainerStore.searchEngineSettings = {
            openInNewTab: true, // 是否在新标签页中打开搜索
            gridColumnCount: 3, // 没行显示几个搜索引擎
            searchEngineName: 'bing',
            searchEngineList: [
                {
                    id: '1725892663580',
                    used: true,
                    name: 'google',
                    icon: './images/search-engines/google.png',
                    searchStatement: 'https://www.google.com/search?q=%s'
                },
                {
                    id: '1725892663581',
                    used: true,
                    name: 'copilot',
                    icon: './images/search-engines/copilot.png',
                    searchStatement: 'https://www.bing.com/search?q=%s'
                },
                {
                    id: '1725892663582',
                    used: false,
                    name: 'cn-bing',
                    icon: './images/search-engines/bing.png',
                    searchStatement: 'https://cn.bing.com/search?q=%s'
                },
                {
                    id: '1725892663583',
                    used: true,
                    name: '百度',
                    icon: './images/search-engines/baidu.png',
                    searchStatement: 'https://www.baidu.com/s?wd=%s', // %s为替换内容
                },
                {
                    id: '1725892663584',
                    used: false,
                    name: 'yandex',
                    icon: './images/search-engines/yandex.svg',
                    searchStatement: 'https://yandex.eu/search/?text=%s', //yandex.ru访问不了
                }
            ]
        }
        localStorage.setItem('searchEngineSettings', JSON.stringify(searchEngineContainerStore.searchEngineSettings))
        console.log('初始化搜索引擎设置')
    }
    // }
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