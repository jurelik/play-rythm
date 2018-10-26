let context = new (window.AudioContext || window.webkitAudioContext)();

let kick = new Sound('sounds/kick.wav');
let snare = new Sound('sounds/snare.wav');
let hat = new Sound('sounds/hat.wav');

let antik = new DrumMachine(120, hat);