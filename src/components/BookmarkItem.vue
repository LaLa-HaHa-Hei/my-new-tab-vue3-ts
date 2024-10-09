<template>
    <div class="bookmark-item" @mouseenter="showEditButton = true" @mouseleave="showEditButton = false">
        <button v-if="bookmark.backgroundText && bookmark.backgroundText.length > 0" class="bookmark-button"
            @click="openUrl" :style="{ backgroundColor: bookmark.backgroundColor }" type="button">{{
                bookmark.backgroundText
            }}</button>
        <button v-else class="bookmark-button" @click="openUrl"
            :style="{ backgroundImage: 'url(' + bookmark.backgroundIcon + ')' }" type="button">
        </button>
        <div class="bookmark-name">{{ props.bookmark.name }}</div>

        <button v-show="showEditButton" class="edit-button" @click="showModalHandler" type="button">
            <img src="/images/edit.svg" />
        </button>
    </div>

    <!-- 编辑书签弹窗 -->
    <Teleport to="body">
        <div class="modal" v-if="showModal">
            <div class="modal-overlay" @click="showModal = false">
                <div class="modal-content" @click.stop>
                    <header>
                        {{ $t('bookmark.editBookmarkTitle') }}
                    </header>
                    <main>
                        <form ref="formField">
                            <label>{{ $t('bookmark.name') }}&ensp;&ensp;<input type="text" name="name"
                                    placflexeholder=" 图标下方文字" :value="bookmark.name"></label>
                            <br />
                            <label>{{ $t('bookmark.url') }}&ensp;&ensp;<input type="text" name="url"
                                    v-model="urlTemp"></label>
                            <br />
                            <div style="display: flex; flex-direction: row; gap: 10px;">
                                <!-- 图标 -->
                                <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
                                    <label>{{ $t('bookmark.icon') }}&ensp;
                                        <input type=" text" name="backgroundIcon"
                                            :placeholder="$t('bookmark.inputPlaceholder')"
                                            v-model="backgroundIconTemp"></label>
                                    <br />
                                    <button @click.prevent="howToUseBackgroundIcon" style="color: red;">{{
                                        $t('bookmark.readMe') }}</button>
                                    &ensp;
                                    <input type="file" accept="image/*" @change="localBackgroundIconChange"
                                        style="width: 150px;" title="从本地上传" />
                                    <br />
                                    {{ $t('bookmark.preview') }}&ensp;&ensp;
                                    <img :src="backgroundIconTemp" @error="imgError"
                                        style="width: 64px; height: 64px; border-radius: 15px; box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);">
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <h3> {{ $t('bookmark.or') }} </h3>
                                </div>
                                <!-- 纯色 -->
                                <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
                                    <label>{{ $t('bookmark.color') }}&ensp;<input type="color" name="backgroundColor"
                                            :value="bookmark.backgroundColor" style="flex:none; width: 30px;"></label>
                                    <br />
                                    <label>{{ $t('bookmark.text') }}&ensp;<input type="text" name="backgroundText"
                                            placeholder=" 显示在背景色上的文字" :value="bookmark.backgroundText"></label>
                                    <br />
                                    <span style="color: red;">{{ $t('bookmark.tip') }}</span>
                                </div>
                            </div>
                        </form>
                    </main>
                    <footer>
                        <button class="modal-delete-button" @click="deleteBookmark">{{
                            $t('bookmark.delete') }}</button>
                        &ensp;&ensp;
                        <button class="modal-add-button" @click="saveBookmark">{{
                            $t('bookmark.save') }}</button>
                        &ensp;&ensp;
                        <button class="modal-cancel-button"
                            @click="showModal = false; formField.reset(); urlTemp = ''; backgroundIconTemp = ''">{{
                                $t('bookmark.cancel') }}</button>
                    </footer>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BookmarkItem'
})
import { ref, watch } from 'vue'
import debounce from 'lodash/debounce'
import { type BookmarkInterface } from '@/types'
const props = defineProps<{
    openInNewTab: boolean;
    bookmark: BookmarkInterface;
}>()
import { useBookmarkContainerStore } from '@/store/bookmarkContainer'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();


const bookmarkContainerStore = useBookmarkContainerStore()
const showEditButton = ref(false)
const showModal = ref(false)
const urlTemp = ref(props.bookmark.url)
const backgroundIconTemp = ref(props.bookmark.backgroundIcon)
const formField = ref()

function openUrl() {
    window.open(props.bookmark.url, props.openInNewTab ? '_blank' : '_self')
}

// 输入网址后，猜测图片url
watch(urlTemp, debounce((newVal) => {
    try {
        //如果是data:开头的图片，则不进行处理
        if (backgroundIconTemp.value.startsWith('data:'))
            return
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
    alert(t('bookmark.usage'))
}
// 若本地上传本地图标，转为base64格式放入图片地址区
function localBackgroundIconChange(event: any) {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e && e.target && e.target.result && typeof e.target.result === 'string')
                backgroundIconTemp.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

function saveBookmark() {
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
    const index = bookmarkContainerStore.bookmarkSettings.bookmarkList.findIndex(item => item.id === props.bookmark.id)
    bookmarkContainerStore.bookmarkSettings.bookmarkList[index] = newBookmark
    if (window.environment === 'extension') {
        chrome.storage.local.set({ 'bookmarkSettings': JSON.stringify(bookmarkContainerStore.bookmarkSettings) })
    }
    else {
        localStorage.setItem('bookmarkSettings', JSON.stringify(bookmarkContainerStore.bookmarkSettings))
    }
    console.log('修改书签成功')
    formField.value.reset()
    // reset无法清楚绑定的值，需要手动清空
    urlTemp.value = ''
    backgroundIconTemp.value = ''
}

function deleteBookmark() {
    const userChoice = confirm(t('bookmark.confirm'))
    if (userChoice) {
        const index = bookmarkContainerStore.bookmarkSettings.bookmarkList.findIndex(item => item.id === props.bookmark.id)
        bookmarkContainerStore.bookmarkSettings.bookmarkList.splice(index, 1)
        if (window.environment === 'extension') {
            chrome.storage.local.set({ 'bookmarkSettings': JSON.stringify(bookmarkContainerStore.bookmarkSettings) })
        }
        else {
            localStorage.setItem('bookmarkSettings', JSON.stringify(bookmarkContainerStore.bookmarkSettings))
        }
    }
}

function showModalHandler() {
    showModal.value = true
    urlTemp.value = props.bookmark.url
    backgroundIconTemp.value = props.bookmark.backgroundIcon
}

</script>

<style scoped>
.bookmark-item {
    position: relative;
    display: flex;
    flex-direction: column;
    /* 交叉轴方向 */
    align-items: center;
    /* 主轴方向 */
    /* justify-content: flex-end; */
}

.bookmark-item>.bookmark-button {
    cursor: pointer;
    border: none;
    width: 64px;
    height: 64px;
    border-radius: 15px;
    font-size: 130%;
    font-weight: 600;
    text-align: center;
    color: white;
    background-size: cover;
    background-repeat: no-repeat;
    /* background-position: center; */
}

.bookmark-name {
    white-space: nowrap;
    color: white;
}

.edit-button {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 0px;
    right: 0;
    padding: 2px;
    background-color: transparent;
    border: none;
    font-weight: bold;
    font-size: 150%;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
}

.edit-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.edit-button img {
    height: 13px;
    width: 13px;
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
    height: 440px;
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