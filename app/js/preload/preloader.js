var checkmarkIdPrefix = "loadingCheckSVG-";
var checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
var verticalSpacing = 50;
var startTime = Date.now();
var minDuration=2000;
var preloader = document.getElementById('preloader');
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function createSVG(tag, properties, opt_children) {
    var prop;
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for(prop in properties) {
        newElement.setAttribute(prop, properties[prop]);
    }
    if (opt_children) {
        opt_children.forEach(function(child) {
            newElement.appendChild(child);
        })
    }
    return newElement;
}

function createPhraseSvg(phrase, yOffset) {
    var text = createSVG("text", {
        fill: "white",
        x: 50,
        y: yOffset,
        "font-size": 18,
        "font-family": "Arial"
    }, null);
    text.appendChild(document.createTextNode(phrase + "..."));
    return text;
}
function createCheckSvg(yOffset, index) {
    var check = createSVG("polygon", {
        points: "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
        fill: "rgba(255,255,255,1)",
        id: checkmarkIdPrefix + index
    }, null);
    var circle_outline = createSVG("path", {
        d: "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
        fill: "white"
    }, null)
    var circle = createSVG("circle", {
        id: checkmarkCircleIdPrefix + index,
        fill: "rgba(255,255,255,0)",
        cx: 16,
        cy: 16,
        r: 15
    },null)
    var group = createSVG("g", {
        transform: "translate(10 " + (yOffset - 20) + ") scale(.9)"
    }, [circle, check, circle_outline]);
    return group;
}

function addPhrasesToDocument(phrases) {
    phrases.forEach(function(phrase, index) {
        var yOffset = 30 + verticalSpacing * index;
        document.getElementById("phrases").appendChild(createPhraseSvg(phrase, yOffset));
        document.getElementById("phrases").appendChild(createCheckSvg(yOffset, index));
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOMContentLoaded event");
    var phrases = shuffleArray(
        [
            "Calibrating Framesets",
            "Adding inline styles",
            "Populating iFrames",
            "Optimizing for <IE6",
            "Removing alt tags",
            "Adding <font> tags",
            "Shuffling bits",
            "Celebrating moments",
            "Generating phrases",
            "Simulating workflow",
            "Empowering humanity",
            "Being aspirational",
            "Doing the hokey pokey",
            "Bueller",
            "Cracking jokes",
            "Slacking off"]);

    addPhrasesToDocument(phrases);
    preload();
});

function preload(){
    [
        'js/Ajax.js'
    ].forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    });
}
function cleanUp(){
    preloader.classList.add('die');
    preloader.addEventListener('transitionend', function(e){
        document.body.removeChild(preloader)
        document.getElementById('page').classList.add('active')
    })

}
window.addEventListener('load', function(){
    console.log("load event");
    var diff = Date.now()-startTime;
    console.log(diff);
    if(diff>minDuration){
        cleanUp();
    } else {
        setTimeout(cleanUp, minDuration-diff);
    }

});
//var p;

/**
 * This is a function where type checking is disabled.
 * @suppress {checkVars, undefinedVars,undefinedNames,missingProperties}
 */
/*
function preload(){
    p = new createjs.LoadQueue(true);
    p.loadManifest(['http://lorempixel.com/400/200/sports']);
    p.addEventListener('complete', function(e){
        console.log("createjs preloader done");
    });
}*/