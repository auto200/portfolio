//https://github.com/tsoding/zzzwe/blob/master/index.js
export default class V2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(that: V2) {
    return new V2(this.x + that.x, this.y + that.y);
  }

  sub(that: V2) {
    return new V2(this.x - that.x, this.y - that.y);
  }

  scale(s: number) {
    return new V2(this.x * s, this.y * s);
  }

  len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const n = this.len();
    return n === 0 ? new V2(0, 0) : new V2(this.x / n, this.y / n);
  }

  dist(that: V2) {
    return this.sub(that).len();
  }

  static polar(mag: number, dir: number) {
    return new V2(Math.cos(dir) * mag, Math.sin(dir) * mag);
  }
}
