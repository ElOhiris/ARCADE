// NON MODIFICARE E NON CANCELLARE

window.addEventListener("load", function() {
  
  let audioButton = document.getElementById("pulsante-audio");
  if (audioButton) {
    stopPropOf( audioButton );
  }
  let infoButton = document.getElementById("pulsante-info");
  stopPropOf( infoButton );
  let infoPanel = document.getElementById("pannello-info");
  stopPropOf( infoPanel );
  
  if (getAudioContext().state == 'suspended') {
    let audioIcon = document.querySelector("#pulsante-audio > span");
    if (audioIcon) {
      audioIcon.className = "lnr lnr-volume";
    } 
  }
});

function stopProp(e) {
    e.stopPropagation();
}
function stopPropOf( element ) {
  element.addEventListener("click", stopProp, false);
  element.addEventListener("mousedown", stopProp, false);
  element.addEventListener("mouseup", stopProp, false);  
  element.addEventListener("mousemove", stopProp, false);  
}

function apriChiudiInfo() {
  var info = document.getElementById("pannello-info");
  if (info.classList.contains("aperto")) {
    info.classList.remove("aperto")
  } else {
    info.classList.add("aperto")
  }
}

function attivaDisattivaAudio() {
  if (getAudioContext().state == 'suspended') {
    getAudioContext().resume();
    document.querySelector("#pulsante-audio > span").className = "lnr lnr-volume-high";
    attivaAudio();
  } else {
    if (getOutputVolume() > 0) {
      outputVolume(0);
      document.querySelector("#pulsante-audio > span").className = "lnr lnr-volume";
      disattivaAudio();
    } else {
      outputVolume(1);
      document.querySelector("#pulsante-audio > span").className = "lnr lnr-volume-high";
      attivaAudio();
    }
  }
}

function attivaAudio() {
  // può essere ridefenitita in sketch.js 
}

function disattivaAudio() {
  // può essere ridefenitita in sketch.js 
}