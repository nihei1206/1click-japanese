// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('メッセージを受信:', request); // 受信したメッセージをログに出力
  if (request.type === 'TOGGLE_FILTER') {
    const isActive = request.isActive;
    const url = new URL(window.location.href);
    
    if (isActive) {
      console.log('日本語フィルタを追加'); // アクティブな状態でフィルタを追加するログ
      url.searchParams.set('lr', 'lang_ja');
      url.searchParams.set('hl', 'ja');
      url.searchParams.append('tbs', 'lr:lang_1ja');
    } else {
      console.log('日本語フィルタを解除'); // 非アクティブな状態でフィルタを解除するログ
      url.searchParams.delete('lr');
      url.searchParams.delete('hl');
      url.searchParams.delete('tbs');
    }

    // 新しいURLにリダイレクト
    console.log('リダイレクト先URL:', url.toString());
    window.location.href = url.toString();
  }
});