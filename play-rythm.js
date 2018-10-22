let context = new (window.AudioContext || window.webkitAudioContext)();
let buffer;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'sounds/kick.wav', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function() {
  buffer = xhr.response;
}
xhr.send();

function play() {
  let source = context.createBufferSource();
  source.connect(context.destination);
  console.log(buffer);
  context.decodeAudioData(buffer.slice(), function(decoded) {
    source.buffer = decoded;
  });
  console.log(buffer);
  source.start();
}
