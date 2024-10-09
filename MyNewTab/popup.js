!(async function () {
    const singleNewTabEnabled = (await chrome.storage.local.get('singleNewTabEnabled')).singleNewTabEnabled === true ? true : false
    document.getElementById('single-new-tab-checkbox').checked = singleNewTabEnabled
})()

document.getElementById('single-new-tab-checkbox').addEventListener('change', function (event) {
    const singleNewTabEnabled = event.target.checked;

    // 发送消息给 background.js，告知检测是否启用
    chrome.storage.local.set({ 'singleNewTabEnabled': singleNewTabEnabled }, function () {
        console.log('新标签页检测已设置为: ' + singleNewTabEnabled);
    });
});