let isActive = false;

chrome.action.onClicked.addListener(async (tab) => {
  console.log('拡張機能のアイコンがクリックされました。'); // アイコンのクリックイベントをログに出力
  // タブのURLを確認
  const url = new URL(tab.url);
  if (url.hostname === 'www.google.com' && url.pathname === '/search') {
    isActive = !isActive;
    console.log('フィルタの状態:', isActive ? '有効' : '無効'); // フィルタの状態をログに出力

    const iconPath = isActive ? "icon_active.png" : "icon_inactive.png";

    // アイコンを更新
    chrome.action.setIcon({ path: iconPath }, () => {
      if (chrome.runtime.lastError) {
        console.error('アイコンの設定エラー:', chrome.runtime.lastError.message);
      } else {
        console.log('アイコンが正常に設定されました:', iconPath);
      }
    });

    // コンテンツスクリプトにメッセージを送信
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_FILTER', isActive });
      console.log('メッセージがコンテンツスクリプトに送信されました。'); // メッセージ送信の成功をログに出力
    } catch (error) {
      console.error('スクリプトの実行またはメッセージ送信エラー:', error.message);
    }
  } else {
    console.log('この拡張機能はGoogle検索結果ページでのみ動作します。'); // 非対応ページでのクリックイベントをログに出力
  }
});