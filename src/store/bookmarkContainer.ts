import { defineStore } from 'pinia'
import { type bookmarkSettingsInterface } from '@/types'

export const useBookmarkContainerStore = defineStore('bookmarkContainer', {
    state(): { bookmarkSettings: bookmarkSettingsInterface; defaultBookmarkSettings: bookmarkSettingsInterface } {
        return {
            bookmarkSettings: {
                openInNewTab: true,
                bookmarkList: []
            },
            defaultBookmarkSettings: {
                openInNewTab: true,
                bookmarkList: [
                    {
                        id: '1725892663580',
                        name: '百度翻译',
                        url: 'https://fanyi.baidu.com/mtpe-individual/multimodal',
                        backgroundIcon: './images/bookmarks/百度翻译.ico',
                        backgroundColor: '',
                        backgroundText: ''
                    },
                    {
                        id: '1725892663582',
                        name: 'DeepSeek',
                        url: 'https://chat.deepseek.com/coder',
                        backgroundIcon: './images/bookmarks/DeepSeek.svg',
                        backgroundColor: '',
                        backgroundText: ''
                    },
                    // {
                    //     id: '1725892663583',
                    //     name: '词源',
                    //     url: 'https://www.dictool.com/ciyuan/',
                    //     backgroundIcon: './images/bookmarks/dictool.ico',
                    //     backgroundColor: '',
                    //     backgroundText: ''
                    // },
                    // {
                    //     id: '1725892663584',
                    //     name: '词跟',
                    //     url: 'https://www.dictool.com/root/',
                    //     backgroundIcon: './images/bookmarks/dictool.ico',
                    //     backgroundColor: '',
                    //     backgroundText: ''
                    // }
                ]
            }
        }
    }
})