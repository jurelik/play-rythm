let context = new (window.AudioContext || window.webkitAudioContext)();

function loadSound(url, sound) {
  let xhr = new XMLHttpRequest();
  let buffer;
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  
  xhr.onload = function() {
    sound = xhr.response;
  }
  xhr.send();
  // return buffer;
}

function play(sound) {
  let source = context.createBufferSource();
  source.connect(context.destination);
  // console.log(buffer);
  context.decodeAudioData(sound.slice(), function(decoded) {
    source.buffer = decoded;
  });
  // console.log(buffer);
  source.start();
}