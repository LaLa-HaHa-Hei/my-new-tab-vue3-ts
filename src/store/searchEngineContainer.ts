import { defineStore } from 'pinia'
import { type searchEngineSettingsInterface } from '@/types'

export const useSearchEngineContainerStore = defineStore('searchEngineContainer', {
    state(): { searchEngineSettings: searchEngineSettingsInterface; defaultSearchEngineSettings: searchEngineSettingsInterface } {
        return {
            searchEngineSettings: {
                openInNewTab: true, // 是否在新标签页中打开搜索
                gridColumnCount: 3, // 没行显示几个搜索引擎
                searchEngineName: 'bing',
                searchEngineList: []
            },
            defaultSearchEngineSettings: {
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
        }
    }
})