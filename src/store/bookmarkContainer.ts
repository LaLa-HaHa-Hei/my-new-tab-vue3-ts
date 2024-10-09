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
                    }
                ]
            }
        }
    }
})