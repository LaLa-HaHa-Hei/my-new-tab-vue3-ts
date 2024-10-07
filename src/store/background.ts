import { defineStore } from 'pinia'
import { type backgroundSettingsInterface } from '@/types'

export const useBackgroundStore = defineStore('background', {
    state(): { backgroundSettings: backgroundSettingsInterface; defaultBackgroundSettings: backgroundSettingsInterface } {
        return {
            backgroundSettings: {
                randomBackground: true,
                backgroundList: [],
                currentBackgroundPath: '',
                defaultBackgroundPath: ''
            },
            defaultBackgroundSettings: {
                randomBackground: true,
                backgroundList: [
                    {
                        used: true,
                        path: './images/backgrounds/湖心小屋.png'
                    },
                    {
                        used: true,
                        path: './images/backgrounds/黛.png',
                    }
                ],
                currentBackgroundPath: '',
                defaultBackgroundPath: './images/backgrounds/黛.png'
            }
        }
    }
})