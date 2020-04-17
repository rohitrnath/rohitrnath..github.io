var n; // = 3;
var box; // = new Array(n);
var width;  // button width
var height; // button height
var time;
var count;
var measureTime;
var jsTimer;
var brokenEgg = "EK_images/broken.png";
var darkColor = "EK_images/egg.jpg";

function resizeBoard(p) {
    var board = document.getElementById("square");
    board.innerHTML = "";
    n = p;
    if (n < 5) {
        width = height = 101;
    } else {
        width = height = 71;
    }
    prepareTable();
}
function checkResult() {

    var val = box[0][0];
    var fail = 0;
    for (x = 0; x < n; x = x + 1) {
        for (y = 0; y < n; y = y + 1) {
            if (box[x][y] != val) {
                fail = 1;
            }
        }
    }
    if (fail == 0) {
        applause();
    }
}
function nextMove(i, j) {
    if (measureTime == 0) {
        return false;
    }
    changeColor(i, j);
    if (j - 1 >= 0) changeColor(i, j - 1);
    if (j + 1 < n) changeColor(i, j + 1);
    if (i - 1 >= 0) changeColor(i - 1, j);
    if (i + 1 < n) changeColor(i + 1, j);
    countMovements();
    checkResult();
}
function changeColor(i, j) {
    var img = document.getElementById("img" + i + j);
    if (box[i][j] == "1") {
        img.setAttribute("src", brokenEgg);
        box[i][j] = 0;
    } else {
        img.setAttribute("src", darkColor);
        box[i][j] = 1;
    }
}
function prepareTable() {
    box = new Array(n);
    for (i = 0; i < n; i = i + 1) {
        box[i] = new Array(n);
    }

    for (i = 0; i < n; i = i + 1) {
        for (j = 0; j < n; j = j + 1) {
            box[i][j] = 0;
        }
    }

    var square = document.getElementById("square");
    for (i = 0; i < n; i = i + 1) {
        for (j = 0; j < n; j = j + 1) {
            var img = document.createElement("img");
            img.setAttribute("id", "img" + i + j);
            img.setAttribute("data-x", i);
            img.setAttribute("data-y", j);
            if (box[i][j] == 1) {
                img.setAttribute("src", darkColor);
            } else {
                img.setAttribute("src", brokenEgg);
            }
            img.setAttribute("width", width);
            img.setAttribute("height", height);
            img.setAttribute("onClick", "javascript:nextMove(" + i + "," + j + ");");
            square.appendChild(img);
        }
        var br = document.createElement("br");
        square.appendChild(br);
    }
    count = -1;
    countMovements();
    measureTime = 1;
    time = -1;
    startTimer();
    window.clearInterval(jsTimer);
    jsTimer = self.setInterval(startTimer, 1000);
}
function startTimer() {
    if (measureTime == 1) {
        time = time + 1;
        var timer = document.getElementById("timer");
        timer.innerHTML = time;
    }
}
function applause() {
    measureTime = 0;
    window.clearInterval(jsTimer);

    var audio = new Audio();

    if (audio.canPlayType("audio/mp3")) {
        audio.src = "audio/applause.mp3";
        //audio.src = "applause.mp3";
    }

    //        else if (audio.canPlayType("audio/ogg")) {
    //            audio.src = "applause.mp3";
    //        }

    audio.play();
}
function countMovements() {
    count = count + 1;
    var counter = document.getElementById("counter");
    counter.innerHTML = count;
}