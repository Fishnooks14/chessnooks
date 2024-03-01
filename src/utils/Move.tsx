export default class Move {
  private x0: number;
  private y0: number;
  private x1: number;
  private y1: number;

  constructor(x0: number, y0: number, x1: number, y1: number) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  getx0() {
    return this.x0;
  }

  gety0() {
    return this.y0;
  }

  getx1() {
    return this.x1;
  }

  gety1() {
    return this.y1;
  }
}
