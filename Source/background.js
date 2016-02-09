function getToggle(callback) {
    chrome.storage.local.get('toggle', function(data){
        callback(data.toggle || false);
    });
}

function setToggle(value, callback){
    chrome.storage.local.set({toggle : value}, function(){
        if(chrome.runtime.lastError) {
            throw Error(chrome.runtime.lastError);
        } else {
            callback();
        }
    });
}

function setIcon(toggle) {
    if (toggle){
        chrome.browserAction.setIcon({path: "on.png"});
    }
    else {
        chrome.browserAction.setIcon({path: "off.png"});
    }
}

getToggle(setIcon);

chrome.browserAction.onClicked.addListener(function(tab) {
    getToggle(function(toggle) {
        toggle = !toggle;
        setToggle(toggle, function() {
            setIcon(toggle);
        });
    });
});
