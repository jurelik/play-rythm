let context = new (window.AudioContext || window.webkitAudioContext)();

class Sound {
  constructor(url) {
    this.url = url;
    // this.context = context;
  }

  play(time) {
    let xhr = new XMLHttpRequest();
    let sound = context.createBufferSource();
    sound.connect(context.destination);
    xhr.open('GET', this.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      context.decodeAudioData(xhr.response, decoded => {
        sound.buffer = decoded;
        sound.start(time);
      });
    }
    xhr.send();
  }
}

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

let playRythm = function() {
  let startTime = context.currentTime;
  let tempo = 80;
  let eightNoteTime = (60 / tempo) / 2;

  for (let bar = 0; bar < 2; bar++) {
    let time = startTime + bar * 8 * eightNoteTime;
    kick.play(time);
    kick.play(time + 4 * eightNoteTime);

    snare.play(time + 2 * eightNoteTime);
    snare.play(time + 6 * eightNoteTime);

    for (let i = 0; i < 8; ++i) {
      hat.play(time + i * eightNoteTime);
    }
  }
  console.log('rip');
}

let kick = new Sound('sounds/kick.wav');
let snare = new Sound('sounds/snare.wav');
let hat = new Sound('sounds/hat.wav');

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

document.addEventListener('keypress', e => {
  if (e.key == 'd') {
    kick.play(context.currentTime);
  }
});
document.addEventListener('keypress', e => {
  if (e.key == 'r') {
    snare.play(context.currentTime);
  }
});
document.addEventListener('keypress', e => {
  if (e.key == 't') {
    hat.play(context.currentTime);
  }
});