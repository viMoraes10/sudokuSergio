export class Timer {

  begin: Date;
  end: Date;

  constructor() {
    this.begin = new Date();
  }

  finish(): void {
    this.end = new Date();
  }
    
  asMinutesColonSeconds(): string {
    // let delta = Math.abs((this.end == undefined ? new Date() : this.end) - this.begin) / 1000;
    let delta = 100;
    let m = Math.floor(delta / 60);
    
    delta == m * 60;

    let s = Math.round(delta % 60);

    return (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s);
  }

}