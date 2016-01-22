var breakTime = 3;
var breakStart = false;
var sessionTime = 25;

var clockStarted;

var seconds = 60;
var startClock = false;

var wav = 'audio/alarm.ogg';
var audio = new Audio(wav);
var played = false;

var initialTimePercent = 25 * 60;
console.log(initialTimePercent)
var currentPercent;

$(document).ready(function() {
  $('#breakPlus').click(function() {

    if (breakTime > 29) {
      return;
    }
    breakTime = parseInt($('#breakLength').html());
    breakTime++;
    $('#breakLength').text(updateDisplay(breakTime));
  });

  $('#breakMinus').click(function() {

    if (breakTime < 2) {
      return;
    }
    breakTime = parseInt($('#breakLength').html());
    breakTime--;
    $('#breakLength').text(updateDisplay(breakTime));
  });

  $('#sessionPlus').click(function() {

    if (sessionTime > 29) {
      return;
    }
    sessionTime = parseInt($('#sessionTime').html());
    seconds = 60;
    sessionTime++;
    initialTimePercent = sessionTime * 60;
    console.log(initialTimePercent)
    $('#sessionLength').text(updateDisplay(sessionTime));
    $('#sessionTime').text(updateDisplay(sessionTime));
    $('#m').text(updateDisplay(sessionTime));
    $('#s').text(updateDisplay(60));
  });

  $('#sessionMinus').click(function() {

    if (sessionTime < 2) {
      return;
    }
    sessionTime = parseInt($('#sessionTime').html());

    seconds = 60;
    sessionTime--;
    initialTimePercent = sessionTime * 60;
    console.log(initialTimePercent)
    $('#sessionLength').text(updateDisplay(sessionTime));
    $('#sessionTime').text(updateDisplay(sessionTime));
    $('#m').text(updateDisplay(sessionTime));
    $('#s').text(updateDisplay(60));
  });


  $('#start').click(function() {
    $('#circle').circleProgress({
      animation: false
    });

    if (startClock != false) {
      //clockStarted = false;
      $('#start').removeClass('fa-pause').addClass('fa-play');

      clearInterval(startClock)
      startClock = false;
    } else {
      $('#start').removeClass('fa-play').addClass('fa-pause');
      //initialTimePercent = sessionTime * 60;
      //console.log(initialTimePercent)
      startClock = setInterval(function() {
        calcSeconds()
      }, 1000);

    }
  })

  resetProgress();


})

function resetProgress() {
  breakStart = false;
  $('#circle').circleProgress({
    reverse: false,
    value: 1,
    startAngle: 4.7,
    /*animation: {
      duration: 1200,
      easing: "circleProgressEase"
    },*/
    animationStartValue: 0,
    size: 300,
    fill: {
      gradient: ["red", "orange", "red"]
    }
  });
}

function progressBreakTime() {
  $('#circle').circleProgress({
    fill: {
      gradient: ["lightgreen", "darkgreen", "lightgreen"]
    }
  });
}

var playsound = function() {
  if (played) {
    audio.pause();
    played = false;
    return
  } else {

    audio.play();
    played = true;
    setTimeout(playsound, 2000); // check again in a second
  }
}



function calcSeconds() {
  if (sessionTime == 0 && seconds == 0) {
    sessionTime = 0;

    $('#circle').circleProgress({
      value: 0
    });
    $('#s').text(updateDisplay(0));
    $('#m').text(updateDisplay(0));

    if (breakTime > 0) {
      playsound();
      sessionTime = breakTime;
      seconds = 60;
      breakTime = 0;
      initialTimePercent = sessionTime * 60;
      progressBreakTime();
      breakstart = true;
      return;
    }
    $('#start').removeClass('fa-pause').addClass('fa-play');
    playsound();
    clearInterval(startClock);
    sessionTime = parseInt($('#sessionTime').html());
    resetProgress();
    return;
  }

  console.log('hi')
  if (seconds == 0) {
    seconds = 60;
  }
  if (seconds == 60) {
    sessionTime--;
    seconds = 59;
  }


  $('#s').text(updateDisplay(seconds))
  $('#m').text(updateDisplay(sessionTime))
  seconds--;
  currentPercent = (sessionTime * 60 + seconds + 1) / initialTimePercent;
  /*console.log("Session Time: " + sessionTime)
  console.log("Seconds: " + seconds);
  console.log("Time Percent " + initialTimePercent);
  console.log("Current Percent " + currentPercent);
  console.log("---------")*/
  //console.log(currentPercent)
  $('#circle').circleProgress({
    value: currentPercent
  });
}

function updateDisplay(val) {
  if (val == 60) val = 0;
  return val < 10 ? '0' + val : val
}

function doStuff() {
  console.log("hello!");
}