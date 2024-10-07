<template>
    <Teleport to="body">
        <button class="settings-button" @click="showModal = true; pageIndex = 0" type="button">
            <img src="/images/setting.svg" alt="设置" />
        </button>
    </Teleport>
    <Teleport to="body">
        <div class="modal" v-show="showModal">
            <div class="modal-overlay" @click="saveAndHideModal">
                <div class="modal-content" @click.stop>
                    <nav>
                        <p style="margin: 20px 20px 18px 20px;font-weight: 600;">设置中心</p>
                        <ul>
                            <li @click="changePage(0)" :class="pageIndex === 0 ? 'active' : ''">搜索</li>
                            <li @click="changePage(1)" :class="pageIndex === 1 ? 'active' : ''">书签</li>
                            <li @click="changePage(2)" :class="pageIndex === 2 ? 'active' : ''">背景</li>
                            <li @click="changePage(3)" :class="pageIndex === 3 ? 'active' : ''">其他</li>
                        </ul>
                    </nav>
                    <div class="page-content">
                        <!-- 页面一 -->
                        <div v-show="pageIndex === 0" class="page">
                            <header>
                                <p>搜索引擎</p>
                            </header>
                            <main>
                                <form ref="searchEngineForm">
                                    <label>在新标签页中搜索<input type="checkbox"
                                            v-model="searchEngineContainerStore.searchEngineSettings.openInNewTab" /></label>
                                    <br />
                                    <label>每行搜索引擎个数&ensp;<input type="number" min="1" max="4" style="width: 30px;"
                                            v-model="searchEngineContainerStore.searchEngineSettings.gridColumnCount" /></label>
                                    <br />
                                    <p>拖动搜索引擎排序</p>
                                    <ul class="search-engine-list">
                                        <li v-for="(engine, index) in searchEngineContainerStore?.searchEngineSettings.searchEngineList"
                                            :key="engine.id" draggable="true" @dragstart="dragStart(index)"
                                            @dragover="allowDrop" @drop="drop(index)" class="engine-item"><input
                                                type="checkbox" v-model="engine.used" />{{
                                                    engine.name }}</li>
                                    </ul>
                                </form>
                            </main>
                            <footer></footer>
                        </div>
                        <!-- 页面二 -->
                        <div v-show="pageIndex === 1" class="page">
                            <header>
                                <p>书签</p>
                            </header>
                            <main>
                                <form ref="bookmarkForm">
                                    <label>在新标签页中打开链接<input type="checkbox"
                                            v-model="bookmarkContainerStore.bookmarkSettings.openInNewTab"></label>
                                </form>
                            </main>
                            <footer>
                            </footer>
                        </div>
                        <!-- 页面三 -->
                        <div v-show="pageIndex === 2" class="page">
                            <header>
                                <p>背景</p>
                            </header>
                            <main>
                                <form ref="backgroundForm">
                                    <label>每次打开页面随机背景<input type="checkbox"
                                            v-model="backgroundStore.backgroundSettings.randomBackground"></label>
                                    <br />
                                    <p>背景图片列表&ensp;
                                        <button @click.prevent="addBackground">添加</button>&ensp;
                                        <button @click.prevent="removeBackground">删除</button>&ensp;
                                        <button @click.prevent="howToUseBackground" style="color: red;">用前必看</button>
                                    </p>
                                    <ul>
                                        <li
                                            v-for="(background, index) in backgroundStore.backgroundSettings.backgroundList">
                                            <input type="checkbox" v-model="background.used" />
                                            ({{ index + 1 }})&ensp;&ensp;{{ background.path }}
                                        </li>
                                    </ul>
                                    <label style="width: 100%; display: flex;">
                                        不随机时的背景图片路径或网址
                                        <input type="text"
                                            v-model="backgroundStore.backgroundSettings.defaultBackgroundPath"
                                            style="flex: 1;" />
                                    </label>
                                </form>
                            </main>
                            <footer></footer>
                        </div>
                        <!-- 页面四 -->
                        <div v-show="pageIndex === 3" class="page">
                            <header>
                                <p>其他</p>
                            </header>
                            <main>
                                <button @click="exportSettings">配置导出到剪切板</button>&ensp;&ensp;
                                <button @click="importSettings">从剪切板导入配置</button>
                                <br />
                                <p>欢迎进群讨论！</p>
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
import { ref } from 'vue'
import { useBookmarkContainerStore } from '@/store/bookmarkContainer'
import { useSearchEngineContainerStore } from '@/store/searchEngineContainer'
import { useBackgroundStore } from '@/store/background'

defineOptions({
    name: 'Settings'
})

const bookmarkContainerStore = useBookmarkContainerStore()
const searchEngineContainerStore = useSearchEngineContainerStore()
const backgroundStore = useBackgroundStore()

const showModal = ref<boolean>(false)
const pageIndex = ref<number>(0)

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

function removeBackground() {
    const index = prompt('请输入要删除的背景图片前面的序号')
    if (index) {
        const indexNum = parseInt(index) - 1
        backgroundStore.backgroundSettings.backgroundList.splice(indexNum, 1)
    }
}

function howToUseBackground() {
    alert('由于浏览器安全限制，无法直接访问本地图片路径，所以添加图片时只能输入网址。\n如果您对电脑的使用比较熟悉，可以将图片放入本扩展目录对应版本文件夹的"newtab\\images\\background"中，然后就可以添加本地图片了。\nedge扩展目录一般在C:\\Users\\用户名\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Extensions\nchrome一般在C:\\Users\\mjcgc\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\n然后上网查询如何判断哪个是本扩展的目录即可')
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
    navigator.clipboard.writeText(settingsStr)
    alert('设置已导出到剪切板')
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
        alert('设置已导入')
    }
    catch (e: any) {
        alert(`导入失败${e.message}`)
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}

.settings-button {
    position: absolute;
    top: 20px;
    right: 20px;
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
    padding: 12px 0px 12px 20px;
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
