let context = new (window.AudioContext || window.webkitAudioContext)();

function playSound(url) {
  let xhr = new XMLHttpRequest();
  let buffer;
  let source = context.createBufferSource();
  source.connect(context.destination);
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  
  xhr.onload = function() {
    buffer = xhr.response;
    context.decodeAudioData(buffer, function(decoded) {
      source.buffer = decoded;
    });
    source.start();
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
