export default {
    settings: {
        nav: {
            title: "Settings",
            searchEngine: "Search Engine",
            bookmark: "Bookmark",
            background: "Background",
            other: "Others"
        },
        searchEnginePage: {
            title: "Search Engine",
            openInNewTab: "Open in New Tab",
            gridColumnCount: "Number of search engines per line",
            dragToSort: "Drag search engine to sort"
        },
        bookmarkPage: {
            title: "Bookmark",
            openInNewTab: "Open in New Tab",
        },
        backgroundPage: {
            title: "Background",
            randomBackground: "Random Background",
            backgroundImageList: "Background Image List",
            add: "Add",
            remove: "Remove",
            readMe: "read me",
            usage: "Due to browser security restrictions, it is not possible to directly access the local image path, so when adding images, only the URL can be entered. \nIf you are familiar with using a computer, you can place the images in the \"newtab\\images\\background\" folder of the corresponding version in this extension directory, and then you can add local images. \nThe edge extension directory is usually located at C:\\Users\\UserName\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Extensions \nchrome is usually located at C:\\Users\\mjcgc\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\n, and then search online to determine which directory is the extension directory",
            defaultBackground: "default image path or URL when not random",
        },
        otherPage: {
            title: "Others",
            export: "Export configuration to clipboard",
            import: "Import configuration from clipboard",
            welcome: "If you have QQ, welcome to join the group discussion",
            exportSuccess: "Configuration has been exported to clipboard",
            exportFailed: "Failed to export configuration to clipboard",
            importSuccess: "Configuration has been imported from clipboard",
            importFailed: "Failed to import configuration from clipboard"
        }
    },
    bookmark: {
        addBookmark: {
            title: "add bookmark",
            name: "website name",
            url: "website url ",
            icon: "icon",
            inputPlaceholder: "URL or base64 image",
            readMe: "read me",
            usage: "After entering the website address, it will automatically guess the website icon, but it is not recommended to use it directly! Directly using a website address as an icon will result in requesting the icon again every time the page is opened, which is very inefficient! Suggest right clicking on the image, clicking 'Save As', downloading the icon, and then clicking 'Select File' to select the downloaded icon. After displaying it normally and adding a bookmark, you can delete the downloaded icon",
            preview: "preview",
            or: "or",
            color: "background color",
            text: "background text",
            tip: "If background text is entered, the background image will become invalid",
            add: "add",
            cancel: "cancel"
        },
        deleteBookmark: {
            confirm: "Are you sure to delete this bookmark?",
        }
    }
}