declare global {
    interface Window {
        environment: string
    }
}
// web或者extension环境
// window.environment = 'extension'
if (typeof window !== 'undefined' && window.chrome && window.chrome.runtime) {
    console.log('扩展环境');
    window.environment = 'extension'
} else {
    console.log('网页环境');
    window.environment = 'web'
}

// chrome.storage.local 不清楚为什么会时不时将数组转为对象！导致调用数组方法报错！！！！！
// 注释掉了所有chrome.storage.local的调用，暂时使用localStorage代替

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())

app.config.errorHandler = (err: any, vm, info) => {
    alert(`发生不可预知的错误！\n请重新安装该扩展并联系作者以帮助他改进（Q群:726549790）\n错误信息： ${err.message}`)
    console.error(err, vm, info)
}

app.mount('#app')
