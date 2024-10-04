import { defineStore } from 'pinia'
import { type backgroundSettingsInterface } from '@/types'

export const useBackgroundStore = defineStore('background', {
    state(): { backgroundSettings: backgroundSettingsInterface } {
        return {
            backgroundSettings: {
                randomBackground: true,
                backgroundList: [],
                currentBackgroundPath: '',
                defaultBackgroundPath: ''
            }
        }
    }
})