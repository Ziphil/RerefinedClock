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

  public abstract update(shift: boolean): void;

  protected getCurrentDate(): Date {
    return new Date();
  }

  protected getShiftedDate(shift: boolean): Date {
    let currentDate = this.getCurrentDate();
    if (shift) {
      return new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
    } else {
      return currentDate;
    }
  }

  protected getGenesis(): Date {
    return new Date(2012, 0, 23);
  }

  protected getBasis(date: Date): Date {
    return new Date(new Date(date).setHours(0, 0, 0, 0));
  }

  // 与えられた日時について、ハイリア暦起日からの完全な経過日数を整数で返します。
  // ハイリア暦起日を与えた場合は 0 を返すので、ハイリア数とは値が 1 ずれるので注意してください。
  protected calcDayCount(date: Date): number {
    let count = FloorMath.div(date.getTime() - this.getGenesis().getTime(), 24 * 60 * 60 * 1000);
    return count;
  }

  // 与えられた日時について、その日の 0 時からの完全な経過秒数を整数で返します。
  protected calcSecondCount(date: Date, ratio: number = 1): number {
    let count = Math.floor((date.getTime() - this.getBasis(date).getTime()) / 1000 * ratio);
    return count;
  }

}


export class HairianCalendar extends Calendar {

  public update(shift: boolean): void {
    let date = this.getShiftedDate(shift);
    let dayCount = this.calcDayCount(date) + 547863;
    let secondCount = this.calcSecondCount(date, 100000 / 86400) + ((shift) ? 25000 : 0);
    let rawYear = FloorMath.div(dayCount * 4 + 3 + FloorMath.div((FloorMath.div((dayCount + 1) * 4, 146097) * 3 + 1) * 4, 4), 1461);
    let rawDay = dayCount - (rawYear * 365 + FloorMath.div(rawYear, 4) - FloorMath.div(rawYear, 100) + FloorMath.div(rawYear, 400));
    this.year = rawYear + 1;
    this.month = FloorMath.div(rawDay, 33) + 1;
    this.day = FloorMath.mod(rawDay, 33) + 1;
    this.weekday = date.getDay();
    this.hairia = dayCount - 547862;
    this.hour = FloorMath.div(secondCount, 10000);
    this.minute = FloorMath.div(FloorMath.mod(secondCount, 10000), 100);
    this.second = FloorMath.mod(secondCount, 10000);
  }

}


export class GregorianCalendar extends Calendar {

  public update(shift: boolean): void {
    let date = this.getShiftedDate(shift);
    let dayCount = this.calcDayCount(date);
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.weekday = date.getDay();
    this.hairia = dayCount + 1;
    this.hour = (shift) ? date.getHours() + 6 : date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

}


export class StopwatchCalendar extends Calendar {

  private lastDate: Date | null = null;
  private offset: number = 0;

  public update(shift: boolean): void {
    let rawDate = this.getCurrentDate();
    let date = this.getShiftedDate(shift);
    let duration = ((this.lastDate !== null) ? rawDate.getTime() - this.lastDate.getTime() : 0) + this.offset;
    this.year = null;
    this.month = null;
    this.day = null;
    this.hairia = null;
    this.weekday = date.getDay();
    this.hour = FloorMath.div(FloorMath.mod(duration, 360000000), 3600000);
    this.minute = FloorMath.div(FloorMath.mod(duration, 3600000), 60000);
    this.second = FloorMath.div(FloorMath.mod(duration, 60000), 1000);
  }

  public start(): void {
    let rawDate = this.getCurrentDate();
    this.lastDate = rawDate;
  }

  public stop(): void {
    let rawDate = this.getCurrentDate();
    this.offset += (this.lastDate !== null) ? rawDate.getTime() - this.lastDate.getTime() : 0;
    this.lastDate = null;
  }

  public startOrStop(): void {
    if (this.lastDate === null) {
      this.start();
    } else {
      this.stop();
    }
  }

  public reset(): void {
    this.lastDate = null;
    this.offset = 0;
  }

  public addOffset(amount: number): void {
    this.offset += amount;
  }

}