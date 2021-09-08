const CHROMIUM_HEADER = 'https://source.chromium.org';
const GERRIT_HEADER = 'https://chromium-review.googlesource.com';
const GOOGLE_GIT_HEADER = 'https://chromium.googlesource.com';


class ChromiumHandler {
	// https://source.chromium.org/chromium/chromium/src/+/main:base/values.h;l=104
	constructor(url) {
		// Default to success.
		this.success = true;

		this.url = url;
		url = url.split(':')[2];
		if (!url) return;

		// Get the file path.
		let file = url.split(';')[0];
		if (!file) return;
		this.file = file;

		// Get the line number.
		// Default to the first line.
		this.line = '1';

		// Case 1: values.h[;bpv=1;bpt=0]
		let line = url.split(';l=')[1];
		if (!line) {
			return;
		}

		// Case 2: values.h;l=104[;bpv=1;bpt=0]
		line = line.split(';')[0];
		if (!line) {
			return;
		}

		// Case 3: values.h;l=104[;bpv=1;bpt=0]?q=values&ss=chromium%2Fchromium%2Fsrc
		line = line.split('?')[0];
		if (!line) {
			return;
		}
		this.line = line;
	}
}

class GerritHandler {
	// https://chromium-review.googlesource.com/c/chromium/src/+/3086892/10/chrome/browser/sync/test/integration/two_client_web_apps_bmo_sync_test.cc#646
	constructor(url) {
		this.url = url;
		url = url.split('/+/')[1];
		if (!url) return;

		// Get the file path
		const chunk = url.split('#')[0];
		
		const SEARCH_TERM = '/';
		let indexOfFirst = chunk.indexOf(SEARCH_TERM);
		const NOT_FIND = -1;
		if (indexOfFirst == NOT_FIND) {
			console.log('First index of' + SEARCH_TERM + ' not find!');
			return;
		}
		let indexOfSecond = chunk.indexOf(SEARCH_TERM, indexOfFirst + 1);
		if (indexOfSecond == NOT_FIND) {
			console.log('Second index of' + SEARCH_TERM + ' not find!');
			return;
		}
		
		let file = chunk.substr(indexOfSecond + 1);
		if (!file) return;

		// Get the line number.
		let line = url.split('#')[1];
		if (line) {
			// If chose from left diff view on Gerrit, there will be a 'b' in 
			// the line number which should get removed.
			line = line.replace('b', '');
		} else {
			// Default to open and locate at the first line.
			line = '1';
		}

		this.file = file;
		this.line = line;
		this.success = true;
	}
}

class GoogleGitHandler {
	// https://chromium.googlesource.com/chromium/src/+/HEAD/chrome/browser/extensions/app_process_apitest.cc#291
	constructor(url) {
		this.url = url;
		url = url.split('/+/')[1];
		if (!url) return;

		// Get the file path
		const chunk = url.split('#')[0];

		const SEARCH_TERM = '/';
		let indexOfFirst = chunk.indexOf(SEARCH_TERM);
		const NOT_FIND = -1;
		if (indexOfFirst == NOT_FIND) {
			console.log('First index of' + SEARCH_TERM + ' not find!');
			return;
		}

		let file = chunk.substr(indexOfFirst + 1);
		if (!file) return;

		// Get the line number.
		let line = url.split('#')[1];
		if (!line)
			line = '1';

		this.file = file;
		this.line = line;
		this.success = true;
	}
}

function GetHandler(url)  {
	if (url.startsWith(CHROMIUM_HEADER)) {
		return ChromiumHandler;
	} 
	
	if (url.startsWith(GERRIT_HEADER)) {
		return GerritHandler;
	}
	
	if (url.startsWith(GOOGLE_GIT_HEADER)) {
		return GoogleGitHandler;
	}

	console.log('Not support website: ' + url);
	return null;
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
	console.log('send', handler);
	let param = Json2Get(handler);
	console.log(param);
	let reqUrl = 'http://127.0.0.1:8989/file?' + param;
	fetch(reqUrl)
	.then((response) => {
		console.log('Response: ', response);
	})
	.catch((error) => {
		console.log('Error: ', error);
	});
};

function handleContextMenusClick(info, tab) {
	switch (info.menuItemId) {
		case 'open_in_editor':
			let url = info.linkUrl;
			if (url == undefined) {
				url = info.pageUrl;
			}
			if (url) {
				console.log(url, "start open");
				RequestOpen(url);
			}
			break;
	};
}

chrome.runtime.onInstalled.addListener((_) => {
	chrome.contextMenus.create({
		id: 'open_in_editor',
		title: 'Open in Editor',
		contexts: ['link', 'selection']
	});

	// This will get triggered when service worker is active. [fast]
	chrome.contextMenus.onClicked.addListener(handleContextMenusClick);
});

// This will get triggered when service worker is inactive. [slow]
chrome.contextMenus.onClicked.addListener(handleContextMenusClick);
