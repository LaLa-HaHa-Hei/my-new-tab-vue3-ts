<template>
    <div class="bookmark-container">
        <BookmarkItem v-for="bookmark in bookmarkContainerStore.bookmarkSettings.bookmarkList" :key="bookmark.id"
            :openInNewTab="bookmarkContainerStore.bookmarkSettings.openInNewTab" :bookmark="bookmark" />

        <div class="add-bookmark-item">
            <button @click="showModal = true" type="button"></button>
            <div class="bookmark-name">添加</div>
        </div>
    </div>
    <!-- 添加书签弹窗 -->
    <Teleport to="body">
        <div class="modal" v-show="showModal">
            <div class="modal-overlay" @click="showModal = false">
                <div class="modal-content" @click.stop>
                    <header>
                        添加书签
                    </header>
                    <main>
                        <form ref="formField">
                            <label>网站名称&ensp;&ensp;<input type="text" name="name" placflexeholder=" 图标下方文字"></label>
                            <br />
                            <label>网站链接&ensp;&ensp;<input type="text" name="url" v-model="urlTemp"></label>
                            <br />

                            <div style="display: flex; flex-direction: row; gap: 10px;">
                                <!-- 图标 -->
                                <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
                                    <label>背景图&ensp;
                                        <input type=" text" name="backgroundIcon" placeholder=" 图片网址"
                                            v-model="backgroundIconTemp"></label>
                                    <br />
                                    <button @click.prevent="howToUseBackgroundIcon" style="color: red;">用前必看</button>
                                    &ensp;
                                    <input type="file" accept="image/*" @change="localBackgroundIconChange"
                                        style="width: 150px;" title="从本地上传" />
                                    <br />
                                    预览&ensp;&ensp;
                                    <img :src="backgroundIconTemp" @error="imgError"
                                        style="width: 64px; height: 64px; border-radius: 15px; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);">
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <h3>或</h3>
                                </div>
                                <!-- 纯色 -->
                                <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
                                    <label>背景色&ensp;<input type="color" name="backgroundColor" value="#23A7F2"
                                            style="flex:none; width: 30px;"></label>
                                    <br />
                                    <label>背景文本&ensp;<input type="text" name="backgroundText"
                                            placeholder=" 显示在背景色上的文字"></label>
                                    <br />
                                    <span style="color: red;">若输入背景文本, 背景图将失效</span>
                                </div>
                            </div>
                        </form>
                    </main>
                    <footer>
                        <button class="modal-add-button" @click="addBookmark">添加</button>
                        &ensp;&ensp;
                        <button class="modal-cancel-button"
                            @click="showModal = false; formField.reset(); urlTemp = ''; backgroundIconTemp = ''">取消</button>
                    </footer>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
/// <reference types="chrome" />
import BookmarkItem from './BookmarkItem.vue'
import { ref, onBeforeMount, watch } from 'vue'
import { type BookmarkInterface, type bookmarkSettingsInterface } from '@/types';
import { useBookmarkContainerStore } from '@/store/bookmarkContainer'
import debounce from 'lodash/debounce'

defineOptions({
    name: "BookmarkContainers",
})

const bookmarkContainerStore = useBookmarkContainerStore()

const showModal = ref(false)
const formField = ref()

const urlTemp = ref('')
const backgroundIconTemp = ref('')
// 输入网址后，猜测图片url
watch(urlTemp, debounce((newVal) => {
    try {
        const parsedUrl = new URL(newVal)
        backgroundIconTemp.value = `${parsedUrl.origin}/favicon.ico`
    }
    catch (e) {
    }
}, 400))
// 猜测网站图标，如果不是ico格式，则改为png格式
function imgError(event: any) {
    if (backgroundIconTemp.value.endsWith('ico')) {
        backgroundIconTemp.value = backgroundIconTemp.value.replace(/ico$/, 'png')
    }
}
// 使用帮助
function howToUseBackgroundIcon() {
    alert('输入网址后会自动猜测网站图标，但是不建议直接使用！\n直接使用网址作为图标将导致每次打开页面都会重新请求图标，效率很低！\n建议右键图片，点 “另存为”，下载图标后点击 “选择文件”选择下载的图标，正常显示并添加书签后即可删除下载的图标')
}
// 若本地上传本地图标，转为base64格式放入图片地址区
function localBackgroundIconChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e && e.target && e.target.result && typeof e.target.result === 'string')
                backgroundIconTemp.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function addBookmark() {
    showModal.value = false
    const formData = new FormData(formField.value)
    const newBookmark: BookmarkInterface = {
        id: `${Date.now()}`,
        name: formData.get('name') as string,
        url: formData.get('url') as string,
        backgroundIcon: formData.get('backgroundIcon') as string,
        backgroundColor: formData.get('backgroundColor') as string,
        backgroundText: formData.get('backgroundText') as string,
    }
    bookmarkContainerStore.bookmarkSettings.bookmarkList.push(newBookmark)
    if (window.environment === 'extension') {
        chrome.storage.local.set({ 'bookmarkSettings': JSON.stringify(bookmarkContainerStore.bookmarkSettings) })
        console.log(bookmarkContainerStore.bookmarkSettings.bookmarkList)
    }
    else {
        localStorage.setItem('bookmarkSettings', JSON.stringify(bookmarkContainerStore.bookmarkSettings))
    }
    console.log('添加书签成功')
    formField.value.reset()
    // reset无法清楚绑定的值，需要手动清空
    urlTemp.value = ''
    backgroundIconTemp.value = ''
}

onBeforeMount(async () => {
    if (window.environment === 'extension') {
        const { bookmarkSettings } = await chrome.storage.local.get('bookmarkSettings')
        bookmarkContainerStore.bookmarkSettings = JSON.parse(bookmarkSettings)
    }
    else {
        const bookmarkSettings = localStorage.getItem('bookmarkSettings')
        if (bookmarkSettings) {
            bookmarkContainerStore.bookmarkSettings = JSON.parse(bookmarkSettings)
        }
        else {
            bookmarkContainerStore.bookmarkSettings = bookmarkContainerStore.defaultBookmarkSettings
            localStorage.setItem('bookmarkSettings', JSON.stringify(bookmarkContainerStore.bookmarkSettings))
            console.log('默认书签数据')
        }
    }
})
</script>

<style scoped>
.bookmark-container {
    height: 100%;
    overflow: auto;
    padding-left: 15%;
    padding-right: 15%;
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(90px, 1fr)); */
    grid-template-columns: repeat(auto-fill, 90px);
    grid-template-rows: repeat(auto-fill, 90px);
    gap: 0px;
}

.bookmark-container::-webkit-scrollbar {
    display: none;
}

.add-bookmark-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.add-bookmark-item>button {
    background-image: url('/images/bookmarks/add-bookmark.svg');
    cursor: pointer;
    border: none;
    width: 64px;
    height: 64px;
    border-radius: 15px;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    /* background-position: center; */
}

.bookmark-name {
    white-space: nowrap;
    color: white;
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
    height: 400px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.modal-content>header {
    font-size: 150%;
    font-weight: bold;
    margin-top: 20px;
    padding-left: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

.modal-content>main {
    flex: 1;
    padding: 15px 30px 5px 30px;
    overflow: auto;
}

.modal-content>main form {
    display: flex;
    flex-direction: column;
}

.modal-content>main form label {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 25px;
    align-items: center;
}

.modal-content>main label>input {
    flex: 1;
    height: 100%;
}

.modal-content>footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    padding-right: 30px;
    padding-bottom: 20px;
}
</style>