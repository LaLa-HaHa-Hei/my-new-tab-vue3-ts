import { defineStore } from 'pinia'
import { type bookmarkSettingsInterface } from '@/types'

export const useBookmarkContainerStore = defineStore('bookmarkContainer', {
    state(): { bookmarkSettings: bookmarkSettingsInterface } {
        return {
            bookmarkSettings: {
                openInNewTab: true,
                bookmarkList: []
            }
        }
    }
})