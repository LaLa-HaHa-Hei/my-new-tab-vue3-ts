import Background from "@/components/Background.vue";
import { add } from "lodash";

export default {
    settings: {
        nav: {
            title: "设置中心",
            searchEngine: "搜索引擎",
            bookmark: "书签栏",
            background: "背景",
            other: "其他"
        },
        searchEnginePage: {
            title: "搜索引擎",
            openInNewTab: "在新标签页中搜索",
            gridColumnCount: "每行搜索引擎个数",
            dragToSort: "拖动搜索引擎排序"
        },
        bookmarkPage: {
            title: "书签栏",
            openInNewTab: "在新标签页中打开链接",
        },
        backgroundPage: {
            title: "背景",
            randomBackground: "每次打开页面随机背景",
            backgroundImageList: "背景图片列表",
            add: "添加",
            remove: "删除",
            readMe: "用前必看",
            usage: "由于浏览器安全限制，无法直接访问本地图片路径，所以添加图片时只能输入网址。\n如果您对电脑的使用比较熟悉，可以将图片放入本扩展目录对应版本文件夹的\"newtab\\images\\background\"中，然后就可以添加本地图片了。\nedge扩展目录一般在C:\\Users\\用户名\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Extensions\nchrome一般在C:\\Users\\mjcgc\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\n然后上网查询如何判断哪个是本扩展的目录即可",
            defaultBackground: "不随机时的背景图片路径或网址",
        },
        otherPage: {
            title: "其他",
            export: "导出配置到剪切板",
            import: "从剪切板导入配置",
            welcome: "欢迎加入QQ群一起讨论~",
            exportSuccess: "设置已导出到剪切板",
            exportFailed: "导出失败",
            importSuccess: "设置已导入",
            importFailed: "导入失败"
        }
    },
    bookmark: {
        addBookmark: {
            title: "添加书签",
            name: "网站名称",
            url: "网址",
            icon: "背景图",
            inputPlaceholder: "网址或base64图片",
            readMe: "用前必看",
            usage: "输入网址后会自动猜测网站图标，但是不建议直接使用！\n直接使用网址作为图标将导致每次打开页面都会重新请求图标，效率很低！\n建议右键图片，点 “另存为”，下载图标后点击 “选择文件”选择下载的图标，正常显示并添加书签后即可删除下载的图标",
            preview: "预览",
            or: "或",
            color: "背景色",
            text: "背景文本",
            tip: "若输入背景文本, 背景图将失效",
            add: "添加",
            cancel: "取消"
        },
        deleteBookmark: {
            confirm: "确认删除该书签吗？",
        }
    }
}