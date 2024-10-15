<template>
    <div class="search-engine-item">
        <div class="search-engine-input-box" :class="inputBoxStyleClass">
            <input type="text" ref="inputField" :placeholder="props.searchEngine.name" @keydown.enter="search"
                v-model="searchText" @mouseenter="handleMouseEnterInput" @focusout="handleFocusOutInput"
                @focusin="handleFocusInInput">
            <img :src="props.searchEngine.icon" alt="搜" @click="search">
        </div>
        <div v-show="isSuggestionBoxShow" class="search-engine-suggestion-box">
            <ul>
                <li :class="activeLiIndex === index ? 'active' : ''" v-for="(suggestion, index) in suggestionList"
                    @mousedown="handleMouseDownLI(index)">{{
                        suggestion }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { type SearchEngineInterface } from '@/types'
import debounce from 'lodash/debounce'

defineOptions({
    name: 'SearchEngineItem',
})
const props = defineProps<{
    openInNewTab: boolean;
    searchEngine: SearchEngineInterface;
    getSearchSuggestions: (keyword: string) => Promise<string[]>;
}>()

const searchText = ref<string>()
const inputField = ref()
const inputBoxStyleClass = ref<string>('search-engine-input-box-initial-state')
const isSuggestionBoxShow = ref<boolean>(false)
const suggestionList = ref<string[]>([])
const activeLiIndex = ref<number>()

function search() {
    if (searchText.value) {
        const searchUrl = props.searchEngine.searchStatement.replace('%s', encodeURIComponent(searchText.value))
        window.open(searchUrl, props.openInNewTab ? '_blank' : '_self')
    }
}

function ShowSuggestions() {
    isSuggestionBoxShow.value = true
    inputBoxStyleClass.value = 'search-engine-input-box-show-suggestion'
}

function HideSuggestions() {
    isSuggestionBoxShow.value = false
    inputBoxStyleClass.value = 'search-engine-input-box-initial-state'
}

if (window.environment === 'extension') {
    watch(searchText, debounce(async (val) => {
        if (val) {
            suggestionList.value = await props.getSearchSuggestions(val)
            if (suggestionList.value.length > 0) {
                ShowSuggestions()
            }
        }
        else {
            HideSuggestions()
        }
    }, 300))
}
else {
    console.log('不是插件环境，存在跨域问题,不启用搜索建议功能')
}

// 鼠标划入输入框时，自动聚焦并选中输入框内容
async function handleMouseEnterInput() {
    inputField.value.focus()
    inputField.value.select()
    if (window.environment === 'extension' && searchText.value) {
        suggestionList.value = await props.getSearchSuggestions(searchText.value)
        if (suggestionList.value.length > 0) {
            ShowSuggestions()
        }
    }
}

function handleFocusInInput() {
    inputBoxStyleClass.value = 'search-engine-input-box-focus-in'
}
// 输入框失去焦点时，隐藏建议列表
function handleFocusOutInput() {
    HideSuggestions()
}

// 鼠标点击建议列表项时，选择当前项并隐藏建议列表
function handleMouseDownLI(index: number) {
    searchText.value = suggestionList.value[index]
    HideSuggestions()
    setTimeout(() => inputField.value.focus(), 0)
}
</script>

<style scoped>
.search-engine-item {
    height: 45px;
}

.search-engine-input-box {
    height: 45px;
    display: flex;
}

.search-engine-input-box-initial-state {
    border-radius: 23px;
    background-color: rgba(255, 255, 255, 0.5);
}

.search-engine-input-box-focus-in {
    border-radius: 23px;
    background-color: white;
}

.search-engine-input-box-show-suggestion {
    border-top-left-radius: 23px;
    border-top-right-radius: 23px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: white;
}

.search-engine-input-box input {
    flex: 1;
    font-size: 110%;
    padding-left: 24px;
    border: none;
    outline: none;
    background-color: transparent;
}

.search-engine-input-box img {
    align-self: center;
    margin-right: 10px;
    height: 30px;
    width: 30px;

}

.search-engine-input-box img:hover {
    cursor: pointer;
}

.search-engine-suggestion-box {
    position: relative;
    top: 0;
    left: 0;
    background-color: white;
    border-top: #c8c8c8 solid 1px;
    z-index: 4;
    border-bottom-left-radius: 23px;
    border-bottom-right-radius: 23px;
    padding-top: 5px;
    padding-bottom: 17px;

}

.search-engine-suggestion-box ul {
    list-style: none;
    margin: 0;
    padding: 0;

}

.search-engine-suggestion-box li {
    padding: 7px 0 7px 20px;
}


.search-engine-suggestion-box li:hover {
    background-color: #efefef;
}
</style>