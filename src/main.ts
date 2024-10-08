declare global {
    interface Window {
        environment: string
    }
}
// 判断web或者extension环境
if (typeof window !== 'undefined' && window.chrome && window.chrome.runtime) {
    console.log('扩展环境');
    window.environment = 'extension'
} else {
    console.log('网页环境');
    window.environment = 'web'
}

// chrome.storage 会时不时将数组转为对象！导致调用数组方法报错！！！！！
// 所以使用chrome.storage时也用json.stringify和json.parse转一下，保证数据类型一致

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import i18n from './lang'


const app = createApp(App)

if (window.environment === 'extension') {
    chrome.storage.local.get('lang', (result) => {
        i18n.global.locale.value = (result.lang === 'en' ? 'en' : 'zh')
    })
}
else {
    const lang = localStorage.getItem('lang')
    i18n.global.locale.value = (lang === 'en' ? 'en' : 'zh')
}

app.use(createPinia())
app.use(i18n)

// 全局错误处理, 正式发布时清除下面注释
// app.config.errorHandler = (err: any, vm, info) => {
//     alert(`unexpeced error occurred! Try toreinstall the extension \n发生意料之外的错误！请重新安装该扩展并联系作者以帮助他改进（Q群:767818556）\n错误信息： ${err.message}`)
//     console.error(err, vm, info)
// }

app.mount('#app')
