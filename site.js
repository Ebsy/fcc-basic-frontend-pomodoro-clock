var breakTime = 3;
var sessionTime = 25;

var seconds = 60;
var startClock = false;




$(document).ready(function() {
  $('#breakPlus').click(function() {
    if (breakTime > 29) {
      return;
    }
    breakTime++;
    $('#breakLength').text(updateDisplay(breakTime));
  });

  $('#breakMinus').click(function() {
    if (breakTime < 2) {
      return;
    }
    breakTime--;
    $('#breakLength').text(updateDisplay(breakTime));
  });

  $('#sessionPlus').click(function() {
    seconds = 60;
    if (sessionTime > 29) {
      return;
    }
    sessionTime++;
    $('#sessionLength').text(updateDisplay(sessionTime));
    $('#sessionTime').text(updateDisplay(sessionTime));
    $('#m').text(updateDisplay(sessionTime));
    $('#s').text(updateDisplay(60));
  });

  $('#sessionMinus').click(function() {
    seconds = 60;
    if (sessionTime < 2) {
      return;
    }
    sessionTime--;
    $('#sessionLength').text(updateDisplay(sessionTime));
    $('#sessionTime').text(updateDisplay(sessionTime));
    $('#m').text(updateDisplay(sessionTime));
    $('#s').text(updateDisplay(60));
  });


  $('#start').click(function() {
    if (startClock != false) {
      clockStarted = false;
      $('#start').removeClass('fa-pause').addClass('fa-play');
      clearInterval(startClock)
      startClock = false;
    } else {
      $('#start').removeClass('fa-play').addClass('fa-pause');
      startClock = setInterval(function() {
        calcSeconds()
      }, 100);

    }
  })

  $('#circle').circleProgress({
    reverse: false,
    value: 1,
    startAngle: 4.7,
    size: 300,
    fill: {
      gradient: ["red", "orange"]
    }
  });

})

function calcSeconds() {
  var secs = sessionTime * 60;
  if (sessionTime == 0 && seconds == 0) {
    sessionTime = 0;
    /*alert('done!');*/
    clearInterval(startClock);
    $('#s').text(updateDisplay(0));
    $('#m').text(updateDisplay(0));
    $('#start').removeClass('fa-pause').addClass('fa-play');
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

  $('#circle').circleProgress({
    value: 1.1
  });
  $('#s').text(updateDisplay(seconds))
  $('#m').text(updateDisplay(sessionTime))
  seconds--;
}

function updateDisplay(val) {
  if (val == 60) val = 0;
  return val < 10 ? '0' + val : val
}

function doStuff() {
  console.log("hello!");
}