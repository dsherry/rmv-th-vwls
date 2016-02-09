var print_msg = true;

$(document).ready(function() {
    rmv_th_vwls();
    retrigger();
});

function rmv_th_vwls() {
    chrome.storage.local.get('toggle', function(data) {
        if (data.toggle === true) {
            walk(document.body);
            if (print_msg === true) {
                console.log('The "rmv th vwls" extension is enabled. You won\'t see any vowels. njy!');
                print_msg = false;
            }
        }
    });
}

function retrigger() {
    retrigger = setInterval(function() {
        rmv_th_vwls();
    }, 1000);
}

function walk(node)
{
    // I stole this function from here:
    // http://is.gd/mwZp7E

    var child, next;

    switch ( node.nodeType )
    {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
	child = node.firstChild;
	while ( child )
	{
	    next = child.nextSibling;
	    walk(child);
	    child = next;
	}
	break;

    case 3: // Text node
	replaceVowels(node);
	break;
    }
}

function replaceVowels(textNode)
{
    var v = textNode.nodeValue;
    // KLL KLL KLLLL
    v = v.replace(/[aeiou]/gi, "");
    textNode.nodeValue = v;
}
