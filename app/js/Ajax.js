var Ajax = {
    post:function(path, dataObj, callback) {
        var xobj = new XMLHttpRequest();
        xobj.open('POST', path, true);
        xobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xobj.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        var s=[];
        for (var prop in dataObj) {
            if(dataObj.hasOwnProperty(prop)){
                s.push(prop + "=" + dataObj[prop]);
            }
        }
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(s.join('&'));
        console.log(s.join('&'));
    },
    get:function (path, callback) {
        var xobj = new XMLHttpRequest();
        xobj.open('GET', path, true);
        xobj.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    },
    getJSON:function loadJSON(path, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true);
        xobj.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(JSON.parse(xobj.responseText));
            }
        };
        xobj.send(null);
    }
}