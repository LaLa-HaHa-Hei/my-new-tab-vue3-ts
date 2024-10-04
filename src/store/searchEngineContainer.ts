import { defineStore } from 'pinia'
import { type searchEngineSettingsInterface } from '@/types'

export const useSearchEngineContainerStore = defineStore('searchEngineContainer', {
    state(): { searchEngineSettings: searchEngineSettingsInterface } {
        return {
            searchEngineSettings: {
                openInNewTab: true, // 是否在新标签页中打开搜索
                gridColumnCount: 3, // 没行显示几个搜索引擎
                searchEngineName: 'bing',
                searchEngineList: []
            }
        }
    }
})