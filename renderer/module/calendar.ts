//

import {
  FloorMath
} from "./floor-math";


export abstract class Calendar {

  public year: number | null = null;
  public month: number | null = null;
  public day: number | null = null;
  public weekday: number | null = null;
  public hairia: number | null = null;
  public hour: number | null = null;
  public minute: number | null = null;
  public second: number | null = null;

  public constructor(date: Date) {
    this.calculate(date);
  }

  protected abstract calculate(date: Date): void;

}


export class HairianCalendar extends Calendar {

  protected calculate(date: Date): void {
    let genesis = new Date(2012, 0, 23);
    let basis = new Date(new Date().setHours(0, 0, 0, 0));
    let dayCount = FloorMath.div(date.getTime() - genesis.getTime(), 24 * 60 * 60 * 1000) + 547863;
    let secondCount = Math.floor((date.getTime() - basis.getTime()) / 1000 / 86400 * 100000);
    let rawYear = FloorMath.div(dayCount * 4 + 3 + FloorMath.div((FloorMath.div((dayCount + 1) * 4, 146097) * 3 + 1) * 4, 4), 1461);
    let remainder = dayCount - (rawYear * 365 + FloorMath.div(rawYear, 4) - FloorMath.div(rawYear, 100) + FloorMath.div(rawYear, 400));
    this.year = rawYear + 1;
    this.month = FloorMath.div(remainder, 33) + 1;
    this.day = FloorMath.mod(remainder, 33) + 1;
    this.weekday = date.getDay();
    this.hairia = dayCount - 547862;
    this.hour = FloorMath.div(secondCount, 10000);
    this.minute = FloorMath.div(FloorMath.mod(secondCount, 10000), 100);
    this.second = FloorMath.mod(secondCount, 10000);
  }

}


export class GregorianCalendar extends Calendar {

  protected calculate(date: Date): void {
    let genesis = new Date(2012, 0, 23);
    let dayCount = FloorMath.div(date.getTime() - genesis.getTime(), 24 * 60 * 60 * 1000);
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.weekday = date.getDay();
    this.hairia = dayCount + 1;
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

}