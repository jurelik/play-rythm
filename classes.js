class Sound {
  constructor(url) {
    this.playStatus = false;

    let xhr = new XMLHttpRequest();
    let self = this;
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      context.decodeAudioData(xhr.response, decoded => {
        self.buffer = decoded;
        console.log('sound is loaded');
      });
    }
    xhr.send();
  }

  play(time) {
    let source = context.createBufferSource();
    source.connect(context.destination);
    source.buffer = this.buffer;
    source.start(time);
  }

  // playRhythm() {
  //   this.playStatus = true;
  //   let self = this;
  //   let tempo = 120;
  //   let quarterNote = 60 / tempo;
  //   let now = context.currentTime;
  //   let count = 0;
  //   while (count < 4) {
  //     self.play(now + count * quarterNote);
  //     count++;
  //   }
  // }

  stop() {
    this.playStatus = false;
  }
}

class DrumMachine {
  constructor(tempo, sound) {
    this.tempo = tempo;
    this.quarterNote = 60 / this.tempo;
    this.lookahead = 0.3;
    this.refresh = 25;
    this.sound = sound;
    this.self = this;
  }

  test() {
    kick.play();
  }

  play() {
    this.noteTime = 0;
    console.log(this.sound);
    this.startTime = context.currentTime;
    this.schedule();
  }

  stop() {
    clearTimeout();
  }

  schedule() {
    let currentTime = context.currentTime - this.startTime;

    if (this.noteTime < currentTime + this.lookahead) {
      this.sound.play();
      // console.log('sup');
      this.nextNote();
    }
    let requestID = requestAnimationFrame(this.schedule.bind(this));
  }

  nextNote() {
    this.noteTime += this.quarterNote;
  }
}