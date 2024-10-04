chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_REQUEST") {
        axios.get(request.url)
            .then(response => {
                sendResponse({ data: response.data });
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });
        return true; // 表示将异步响应
    }
});

// chrome.runtime.onInstalled.addListener(() => {
//     setDefaultBackgroundSettings()
//     setDefaultBookmarkSettings()
//     setDefaultSearchEngineSettings()
// });


// function setDefaultBackgroundSettings() {
//     backgroundSettings = {
//         randomBackground: true,
//         backgroundList: [
//             {
//                 used: true,
//                 path: './images/backgrounds/到账锦鲤一对请查收.png'
//             },
//             {
//                 used: true,
//                 path: './images/backgrounds/月圆龙腾山河间.png'
//             },
//             {
//                 used: true,
//                 path: './images/backgrounds/湖心小屋.png'
//             },
//             {
//                 used: true,
//                 path: './images/backgrounds/锦鲤护体.png'
//             },
//             {
//                 used: true,
//                 path: './images/backgrounds/青松山下与满月.png'
//             },
//             {
//                 used: true,
//                 path: './images/backgrounds/黛.png',
//             }
//         ],
//         currentBackgroundPath: '',
//         defaultBackgroundPath: './images/backgrounds/黛.png'
//     }
//     chrome.storage.local.set({ backgroundSettings: backgroundSettings }, () => {
//         if (chrome.runtime.lastError) {
//             console.error(`写入默认背景设置 失败: (${chrome.runtime.lastError.stack})`)
//             alert(`写入默认背景设置 失败: (${chrome.runtime.lastError.stack})`)
//         }
//         else {
//             console.log('写入默认背景设置 成功')
//         }
//     })
// }

// function setDefaultBookmarkSettings() {
//     bookmarkSettings = {
//         openInNewTab: true, // 是否在新标签页中打开
//         bookmarkList: [
//             {
//                 id: '1725892663580',
//                 name: '百度翻译',
//                 url: 'https://fanyi.baidu.com/mtpe-individual/multimodal',
//                 backgroundIcon: './images/bookmarks/百度翻译.ico',
//                 backgroundColor: '',
//                 backgroundText: ''
//             },
//             {
//                 id: '1725892663582',
//                 name: 'DeepSeek',
//                 url: 'https://chat.deepseek.com/coder',
//                 backgroundIcon: './images/bookmarks/DeepSeek.svg',
//                 backgroundColor: '',
//                 backgroundText: ''
//             },
//         ]
//     }
//     chrome.storage.local.set({ bookmarkSettings: bookmarkSettings }, () => {
//         if (chrome.runtime.lastError) {
//             console.error(`写入默认书签设置 失败: (${chrome.runtime.lastError.stack})`)
//             alert(`写入默认书签设置 失败: (${chrome.runtime.lastError.stack})`)
//         }
//         else {
//             console.log('写入默认书签设置 成功')
//         }
//     })
// }

// function setDefaultSearchEngineSettings() {
//     searchEngineSettings = {
//         openInNewTab: true, // 是否在新标签页中打开搜索
//         gridColumnCount: 3, // 没行显示几个搜索引擎
//         searchEngineName: 'bing',
//         searchEngineList: [
//             {
//                 id: '1725892663580',
//                 used: true,
//                 name: 'google',
//                 icon: './images/search-engines/google.png',
//                 searchStatement: 'https://www.google.com/search?q=%s'
//             },
//             {
//                 id: '1725892663581',
//                 used: true,
//                 name: 'copilot',
//                 icon: './images/search-engines/copilot.png',
//                 searchStatement: 'https://www.bing.com/search?q=%s'
//             },
//             {
//                 id: '1725892663582',
//                 used: false,
//                 name: 'cn-bing',
//                 icon: './images/search-engines/bing.png',
//                 searchStatement: 'https://cn.bing.com/search?q=%s'
//             },
//             {
//                 id: '1725892663583',
//                 used: true,
//                 name: '百度',
//                 icon: './images/search-engines/baidu.png',
//                 searchStatement: 'https://www.baidu.com/s?wd=%s', // %s为替换内容
//             },
//             {
//                 id: '1725892663584',
//                 used: false,
//                 name: 'yandex',
//                 icon: './images/search-engines/yandex.svg',
//                 searchStatement: 'https://yandex.eu/search/?text=%s', //yandex.ru访问不了
//             }
//         ]
//     }
//     chrome.storage.local.set({ searchEngineSettings: searchEngineSettings }).then(() => {
//         console.log('写入默认搜索设置 成功')
//     }).catch(error => {
//         console.error(`写入默认搜索设置 失败: (${error.stack || error.message})`)
//         alert(`写入默认搜索设置 失败: (${error.stack || error.message})`)
//     })
// }