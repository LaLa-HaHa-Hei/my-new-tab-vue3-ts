<template>
    <div class="bookmark-item">
        <button class="bookmark-button" @click="openUrl"
            v-if="bookmark.backgroundText && bookmark.backgroundText.length > 0"
            :style="{ backgroundColor: bookmark.backgroundColor }" type="button">{{
                bookmark.backgroundText
            }}</button>
        <button class="bookmark-button" @click="openUrl" v-else
            :style="{ backgroundImage: 'url(' + bookmark.backgroundIcon + ')' }" type="button"></button>
        <div class="bookmark-name">{{ props.bookmark.name }}</div>

        <button class="delete-button" @click="deleteBookmark" type="button">
            <img src="/images/delete.svg" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { type BookmarkInterface } from '@/types';
const props = defineProps<{
    openInNewTab: boolean;
    bookmark: BookmarkInterface;
}>()
import { useBookmarkContainerStore } from '@/store/bookmarkContainer'

defineOptions({
    name: 'BookmarkItem'
})

const bookmarkContainerStore = useBookmarkContainerStore()
function openUrl() {
    window.open(props.bookmark.url, props.openInNewTab ? '_blank' : '_self');
}

function deleteBookmark() {
    const userChoice = confirm('确认要删除？');
    if (userChoice) {
        const index = bookmarkContainerStore.bookmarkSettings.bookmarkList.findIndex(item => item.id === props.bookmark.id)
        bookmarkContainerStore.bookmarkSettings.bookmarkList.splice(index, 1)
        // if (window.environment === 'extension') {
        //     chrome.storage.local.set({ bookmarkSettings: bookmarkContainerStore.bookmarkSettings })
        // }
        // else {
        localStorage.setItem('bookmarkSettings', JSON.stringify(bookmarkContainerStore.bookmarkSettings))
        // }
    }
}

</script>

<style scoped>
.bookmark-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
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

.delete-button {
    position: absolute;
    height: 17px;
    width: 17px;
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

.delete-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.delete-button img {
    height: 13px;
    width: 13px;
}
</style>