var Ajax={post:function(e,t,n){var a=new XMLHttpRequest;a.open("POST",e,!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded");var o=[];for(var s in t)t.hasOwnProperty(s)&&o.push(s+"="+t[s]);a.onreadystatechange=function(){4==a.readyState&&"200"==a.status&&n(a.responseText)},a.send(o.join("&")),console.log(o.join("&"))},get:function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&"200"==n.status&&t(n.responseText)},n.send(null)},getJSON:function(e,t){var n=new XMLHttpRequest;n.overrideMimeType("application/json"),n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&"200"==n.status&&t(n.responseText)},n.send(null)}};