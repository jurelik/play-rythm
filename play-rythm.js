let context = new (window.AudioContext || window.webkitAudioContext)();

let playSound = function(url) {
  let xhr = new XMLHttpRequest();
  let sound = context.createBufferSource();
  sound.connect(context.destination);
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    context.decodeAudioData(xhr.response, decoded => {
      sound.buffer = decoded;
      sound.start();
    });
  }
  xhr.send();
}

document.addEventListener('keypress', e => {
  if (e.key == 'a') {
    playSound('sounds/kick.wav');
  }
});
document.addEventListener('keypress', e => {
  if (e.key == 'w') {
    playSound('sounds/snare.wav');
  }
});
document.addEventListener('keypress', e => {
  if (e.key == 'e') {
    playSound('sounds/hat.wav');
  }
});