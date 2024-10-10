<!-- <template>
    <button type="button" @click="importFromBrowser">{{
        $t('settings.bookmarkPage.importFromBrowser') }}</button>
    <br />
    <div class="bookmark-container">
        <nav>
            <ul>
                <li v-for="(value, key) in newBookmarkObj">{{ key }}
                </li>
            </ul>
        </nav>
        <div>
            <div></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// const props = defineProps<{
//     bookmarkObj: any
// }>()

const newBookmarkObj = ref<any>({})

// 从收藏夹导入书签
function importFromBrowser() {
    if (window.environment !== 'extension') {
        alert('仅在扩展环境下支持导入书签')
        return
    }
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        traverseBookmarks(bookmarkTreeNodes[0].children, 'root')
    })

}

// 递归遍历书签树
function traverseBookmarks(nodes: any, parentName: string) {
    nodes.forEach(function (node: any) {
        if (node.children) {
            // 如果是文件夹，递归遍历
            newBookmarkObj.value[node.title] = []
            traverseBookmarks(node.children, node.title);
        } else {
            newBookmarkObj.value[parentName].push({ name: node.title, url: node.url })
        }
    });
}
</script>

<style scoped>
.bookmark-container {
    display: flex;
}
</style> -->