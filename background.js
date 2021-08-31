class ChromiumHandler {
	// https://source.chromium.org/chromium/chromium/src/+/main:base/values.h;l=104
	constructor(url) {
		this.url = url;
		url = url.replace("https://source.chromium.org/chromium","");
		url = url.split(':')[1];
		if (!url) return;

		// Get the file path
		let file = url.split(';')[0];
		if (!file) return;

		// Get the line number
		let line = url.split(';l=')[1].split(';')[0].split("?")[0];
		if (!line)
			line = "1";

		this.file = file;
		this.line = line;
		this.success = true;
	}
}

class GerritHandler {
	// https://chromium-review.googlesource.com/c/chromium/src/+/3086892/10/chrome/browser/sync/test/integration/two_client_web_apps_bmo_sync_test.cc#646
	constructor(url) {
		this.url = url;
		url = url.replace("https://chromium-review.googlesource.com/c/chromium/src/+/","");

		// Get the file path
		const chunk = url.split('#')[0];
		
		const SEARCH_TERM = '/';
		let indexOfFirst = chunk.indexOf(SEARCH_TERM);
		const NOT_FIND = -1;
		if (indexOfFirst == NOT_FIND) {
			console.log("First index of" + SEARCH_TERM + " not find");
			return;
		}
		let indexOfSecond = chunk.indexOf(SEARCH_TERM, indexOfFirst + 1);
		if (indexOfSecond == NOT_FIND) {
			console.log("Second index of" + SEARCH_TERM + " not find");
			return;
		}
		
		let file = chunk.substr(indexOfSecond + 1);
		if (!file) return;

		// Get the line number
		let line = url.split('#')[1];
		if (line) {
			line.replace('d', '');
		} else {
			line = "1";
		}

		this.file = file;
		this.line = line;
		this.success = true;
	}
}

function GetHandler(url) {
	if (url.startsWith('https://chromium-review.googlesource.com/')) {
		return GerritHandler;
	} else if (url.startsWith('https://source.chromium.org/')) {
		return ChromiumHandler;
	}
}

function Json2Get(json){
	let str = `f=${json.file}&l=${json.line}`;
	return str;
}

function RequestOpen(url) {
	let handlerClass = GetHandler(url);

	if (!handlerClass) return;

	let handler = new handlerClass(url);

	if (!handler || !handler.success) return;
	console.log("send", handler);
	let param = Json2Get(handler);
	console.log(param);
	let reqUrl = "http://127.0.0.1:8989/file?" + param;
	fetch(reqUrl)
	.then((response) => {
		console.log("Response: ", response);
	})
	.catch((error) => {
		console.log("Error: ", error);
	});
};

chrome.runtime.onInstalled.addListener((_) => {
	chrome.contextMenus.create({
		id: 'open_in_editor',
		title: 'Open in Editor',
		contexts: ['link', 'selection']
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case 'open_in_editor':
			let url = info.linkUrl;
			if (url == undefined) {
				url = info.pageUrl;
			}
			if (url) {
				console.log(url, "start open")
				RequestOpen(url)
			}
			break;
	};
});
