<template>
    <Teleport to="body">
        <div class="settings-bar">
            <label class="language-selector">
                <img src="/images/language.svg" alt="language" />
                <select v-model="$i18n.locale">
                    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{
                        locale }}
                    </option>
                </select>
            </label>
            &ensp;&ensp;
            <button class="settings-button" @click="showModal = true; pageIndex = 0" type="button">
                <img src="/images/setting.svg" alt="设置" />
            </button>
        </div>
    </Teleport>
    <Teleport to="body">
        <div class="modal" v-show="showModal">
            <div class="modal-overlay" @click="saveAndHideModal">
                <div class="modal-content" @click.stop>
                    <nav>
                        <p style="margin: 20px 20px 18px 20px;font-weight: 600;">{{ $t('settings.nav.title') }}</p>
                        <ul>
                            <li @click="changePage(0)" :class="pageIndex === 0 ? 'active' : ''">
                                {{ $t('settings.nav.searchEngine') }}</li>
                            <li @click="changePage(1)" :class="pageIndex === 1 ? 'active' : ''">{{
                                $t('settings.nav.bookmark') }}</li>
                            <li @click="changePage(2)" :class="pageIndex === 2 ? 'active' : ''">{{
                                $t('settings.nav.background') }}</li>
                            <li @click="changePage(3)" :class="pageIndex === 3 ? 'active' : ''">{{
                                $t('settings.nav.other') }}</li>
                        </ul>
                    </nav>
                    <div class="page-content">
                        <!-- 页面一 搜索引擎 -->
                        <div v-show="pageIndex === 0" class="page">
                            <header>
                                <p>{{ $t('settings.searchEnginePage.title') }}</p>
                            </header>
                            <main>
                                <form ref="searchEngineForm">
                                    <label>{{ $t('settings.searchEnginePage.openInNewTab') }}<input type="checkbox"
                                            v-model="searchEngineContainerStore.searchEngineSettings.openInNewTab" /></label>
                                    <br />
                                    <label>{{ $t('settings.searchEnginePage.gridColumnCount') }}&ensp;<input
                                            type="number" min="1" max="4" style="width: 30px;"
                                            v-model="searchEngineContainerStore.searchEngineSettings.gridColumnCount" /></label>
                                    <br />
                                    <p>{{ $t('settings.searchEnginePage.dragToSort') }}</p>
                                    <ul class="search-engine-list">
                                        <li v-for="(engine, index) in searchEngineContainerStore?.searchEngineSettings.searchEngineList"
                                            :key="engine.id" draggable="true" @dragstart="dragStart(index)"
                                            @dragover="allowDrop" @drop="drop(index)" class="engine-item"><input
                                                type="checkbox" v-model="engine.used" />{{
                                                    engine.name }}
                                        </li>
                                    </ul>
                                </form>
                            </main>
                            <footer></footer>
                        </div>
                        <!-- 页面二 书签 -->
                        <div v-show="pageIndex === 1" class="page">
                            <header>
                                <p>书签</p>
                            </header>
                            <main>
                                <form ref="bookmarkForm">
                                    <label>{{ $t('settings.bookmarkPage.openInNewTab') }}<input type="checkbox"
                                            v-model="bookmarkContainerStore.bookmarkSettings.openInNewTab"></label>
                                    <br />
                                    <!-- <button type="button" @click="importFromBrowser">{{
                                        $t('settings.bookmarkPage.importFromBrowser') }}</button> -->
                                </form>
                            </main>
                            <footer>
                            </footer>
                        </div>
                        <!-- 页面三 背景 -->
                        <div v-show="pageIndex === 2" class="page">
                            <header>
                                <p>{{ $t('settings.backgroundPage.title') }}</p>
                            </header>
                            <main>
                                <form ref="backgroundForm">
                                    <label>{{ $t('settings.backgroundPage.randomBackground') }}<input type="checkbox"
                                            v-model="backgroundStore.backgroundSettings.randomBackground"></label>
                                    <br />
                                    <p>{{ $t('settings.backgroundPage.backgroundImageList') }}&ensp;
                                        <button @click.prevent="addBackground">{{ $t('settings.backgroundPage.add')
                                            }}</button>&ensp;
                                        <button @click.prevent="removeBackground">{{
                                            $t('settings.backgroundPage.remove') }}</button>&ensp;
                                        <button @click.prevent="howToUseBackground" style="color: red;">{{
                                            $t('settings.backgroundPage.readMe') }}</button>
                                    </p>
                                    <ul>
                                        <li
                                            v-for="(background, index) in backgroundStore.backgroundSettings.backgroundList">
                                            <input type="checkbox" v-model="background.used" />
                                            ({{ index + 1 }})&ensp;&ensp;{{ background.path }}
                                        </li>
                                    </ul>
                                    <label style="width: 100%; display: flex;">
                                        {{ $t('settings.backgroundPage.defaultBackground') }}
                                        <input type="text"
                                            v-model="backgroundStore.backgroundSettings.defaultBackgroundPath"
                                            style="flex: 1;" />
                                    </label>
                                </form>
                            </main>
                            <footer></footer>
                        </div>
                        <!-- 页面四 其他 -->
                        <div v-show="pageIndex === 3" class="page">
                            <header>
                                <p>{{ $t('settings.otherPage.title') }}</p>
                            </header>
                            <main>
                                <button @click="exportSettings">{{ $t('settings.otherPage.export')
                                    }}</button>&ensp;&ensp;
                                <button @click="importSettings">{{ $t('settings.otherPage.import') }}</button>
                                <br />
                                <!-- <button @click="exportSettingsAsFile">{{ $t('settings.otherPage.exportAsFile')
                                    }}></button>
                                <button ref="importSettingsFromFileField" @click="importSettingsFromFile">{{
                                    $t('settings.otherPage.importFromFile')
                                }}</button>
                                <br /> -->
                                <p>{{ $t('settings.otherPage.welcome') }}</p>
                                <img src="/images/qqGroup.jpg" style="width: 300px;" />
                            </main>
                            <footer></footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { useBookmarkContainerStore } from '@/store/bookmarkContainer'
import { useSearchEngineContainerStore } from '@/store/searchEngineContainer'
import { useBackgroundStore } from '@/store/background'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

defineOptions({
    name: 'Settings'
})

const bookmarkContainerStore = useBookmarkContainerStore()
const searchEngineContainerStore = useSearchEngineContainerStore()
const backgroundStore = useBackgroundStore()
const importSettingsFromFileField = ref()

const showModal = ref<boolean>(false)
const pageIndex = ref<number>(0)

watch(locale, val => {
    if (window.environment === 'extension') {
        chrome.storage.local.set({ 'lang': val })
    }
    else {
        localStorage.setItem('lang', val)
    }
})
// 搜索引擎拖动排序
const draggingIndex = ref<number>(-1)
function changePage(index: number) {
    pageIndex.value = index
}
const dragStart = (index: number) => {
    draggingIndex.value = index;
}

const allowDrop = (e: any) => {
    e.preventDefault();
}

const drop = (index: number) => {
    const draggedItem = searchEngineContainerStore.searchEngineSettings.searchEngineList.splice(draggingIndex.value, 1)[0];
    searchEngineContainerStore.searchEngineSettings.searchEngineList.splice(index, 0, draggedItem);
    draggingIndex.value = -1;
}

// function importFromBrowser() {
//     if (window.environment !== 'extension') {
//         alert('仅在扩展环境下支持导入书签')
//         return
//     }
//     chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
//         // 递归遍历书签树
//         function traverseBookmarks(nodes: any) {
//             nodes.forEach(function (node: any) {
//                 if (node.children) {
//                     // 如果是文件夹，递归遍历
//                     traverseBookmarks(node.children);
//                 } else {
//                     // 打印书签的标题和URL
//                     console.log('Title:', node.title);
//                     console.log('URL:', node.url);
//                 }
//             });
//         }
//         traverseBookmarks(bookmarkTreeNodes);
//     });
// }

// 背景图片
function addBackground() {
    const imgPath = prompt('请输入背景图片网址')
    if (imgPath) {
        backgroundStore.backgroundSettings.backgroundList.push({
            path: imgPath,
            used: true
        })
    }
}
// 删除背景图片
function removeBackground() {
    const index = prompt('请输入要删除的背景图片前面的序号')
    if (index) {
        const indexNum = parseInt(index) - 1
        backgroundStore.backgroundSettings.backgroundList.splice(indexNum, 1)
    }
}
// 背景图片使用说明
function howToUseBackground() {
    alert(t('settings.backgroundPage.usage'))
}
// 保存并隐藏模态框
function saveAndHideModal() {
    showModal.value = false
    if (window.environment === 'extension') {
        chrome.storage.local.set({ 'bookmarkSettings': JSON.stringify(bookmarkContainerStore.bookmarkSettings) })
        chrome.storage.local.set({ 'searchEngineSettings': JSON.stringify(searchEngineContainerStore.searchEngineSettings) })
        chrome.storage.local.set({ 'backgroundSettings': JSON.stringify(backgroundStore.backgroundSettings) })
    }
    else {
        localStorage.setItem('bookmarkSettings', JSON.stringify(bookmarkContainerStore.bookmarkSettings))
        localStorage.setItem('searchEngineSettings', JSON.stringify(searchEngineContainerStore.searchEngineSettings))
        localStorage.setItem('backgroundSettings', JSON.stringify(backgroundStore.backgroundSettings))
    }
}

// 导出设置
function exportSettings() {
    const settings = {
        bookmarkSettings: bookmarkContainerStore.bookmarkSettings,
        searchEngineSettings: searchEngineContainerStore.searchEngineSettings,
        backgroundSettings: backgroundStore.backgroundSettings
    }
    const settingsStr = JSON.stringify(settings)
    try {
        navigator.clipboard.writeText(settingsStr)
        alert(t('settings.otherPage.exportSuccess'))
    }
    catch (e: any) {
        alert(`${t('settings.otherPage.exportFail')}\n${e.message}`)
    }
}

// 导入设置
async function importSettings() {
    try {
        const settingsStr = await navigator.clipboard.readText()
        const settingsObj = JSON.parse(settingsStr)
        bookmarkContainerStore.bookmarkSettings = settingsObj.bookmarkSettings
        searchEngineContainerStore.searchEngineSettings = settingsObj.searchEngineSettings
        backgroundStore.backgroundSettings = settingsObj.backgroundSettings
        if (window.environment === 'extension') {
            chrome.storage.local.set({ 'bookmarkSettings': JSON.stringify(bookmarkContainerStore.bookmarkSettings) })
            chrome.storage.local.set({ 'searchEngineSettings': JSON.stringify(searchEngineContainerStore.searchEngineSettings) })
            chrome.storage.local.set({ 'backgroundSettings': JSON.stringify(backgroundStore.backgroundSettings) })
        }
        else {
            localStorage.setItem('bookmarkSettings', JSON.stringify(bookmarkContainerStore.bookmarkSettings))
            localStorage.setItem('searchEngineSettings', JSON.stringify(searchEngineContainerStore.searchEngineSettings))
            localStorage.setItem('backgroundSettings', JSON.stringify(backgroundStore.backgroundSettings))
        }
        alert(t('settings.otherPage.importSuccess'))
    }
    catch (e: any) {
        alert(`${t('settings.otherPage.importFail')}\n${e.message}`)
    }
}

// async function exportSettingsAsFile() {
//     const settingsStr = await navigator.clipboard.readText()
//     const settingsObj = JSON.parse(settingsStr)

//     // 创建 Blob 对象
//     const blob = new Blob([settingsStr], { type: "text/plain" });

//     // 创建一个指向该 Blob 的 URL
//     const url = URL.createObjectURL(blob);

//     // 创建一个链接元素
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "settings.txt"; // 指定下载的文件名

//     // 触发下载
//     document.body.appendChild(a);
//     a.click();

//     // 清理 URL 对象
//     URL.revokeObjectURL(url);
//     a.remove();

// }

// async function importSettingsFromFile() {
//     // 创建一个隐藏的文件输入元素
//     importSettingsFromFileField.value.type = "file";
//     importSettingsFromFileField.value.accept = ".txt"; // 限制选择文本文件

//     // 当选择文件后读取内容
//     importSettingsFromFileField.value.addEventListener("change", () => {
//         const file = importSettingsFromFileField.value.files[0];

//         if (!file) {
//             return; // 如果没有选择文件，则退出
//         }

//         const reader = new FileReader();

//         reader.onload = (event) => {
//             try {
//                 const settings = JSON.parse(event.target.result);
//                 console.log("导入的设置:", settings);
//                 document.getElementById("output").textContent = JSON.stringify(settings, null, 2); // 显示导入的设置
//             } catch (error) {
//                 alert("无法解析文件内容，请确保是有效的 JSON 格式！");
//             }
//         };
//         reader.readAsText(file); // 以文本形式读取文件
//     });

//     // 手动触发文件输入的点击事件
//     fileInput.click();
// }
</script>

<style scoped>
ul {
    list-style: none;
}

.settings-bar {
    position: absolute;
    top: 10px;
    right: 20px;
    display: flex;
    flex-direction: row;
}

.language-selector {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.language-selector img {
    width: 25px;
    height: 25px;
}

.settings-button {
    width: 35px;
    height: 35px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.settings-button:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
}

.settings-button img {
    width: 27px;
    height: 27px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.modal-overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 70%;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
}

.modal-content nav {
    border-right: 1px solid #e5e5e5;
}

.modal-content nav ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
}


.modal-content nav ul>li {
    padding: 12px 12px 12px 20px;
    cursor: pointer;
}

.modal-content nav ul>li.active {
    color: #0078D4;
    background-color: #DFEFFE;
    border-right: 2px solid #0078D4;
}

.page-content {
    flex: 1;
}

.page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
}

.page header {
    font-weight: 600;
    padding: 4px 30px 2px 30px;
    border-bottom: 1px solid #868686;
}

.page main {
    padding: 20px;
    flex: 1;
}

.page main form {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.search-engine-list li {
    border: 1px solid #adadad;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
}

.page footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 40px 20px 30px;
}
</style>
