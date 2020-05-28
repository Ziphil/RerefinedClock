//

import {
  FloorMath
} from "./floor-math";


export class LiteralUtilType<T extends string> {

  private values: Array<T>;
  public defaultValue: T;
  public is: (value: string) => value is T;

  private constructor(values: Array<T>, defaultValue: T, is: (value: string) => value is T) {
    this.values = values;
    this.defaultValue = defaultValue;
    this.is = is;
  }

  public cast(value: string | number | null): T {
    if (typeof value === "string") {
      if (this.is(value)) {
        return value;
      } else {
        return this.defaultValue;
      }
    } else if (typeof value === "number") {
      if (value >= 0 && value < this.values.length) {
        return this.values[value];
      } else {
        return this.defaultValue;
      }
    } else {
      return this.defaultValue;
    }
  }

  public indexOf(value: string): number {
    let anyValue = value as any;
    let index = this.values.indexOf(anyValue);
    return index;
  }

  public previous(value: string): T {
    let anyValue = value as any;
    let index = this.values.indexOf(anyValue);
    if (index >= 0) {
      let previousIndex = FloorMath.mod(index - 1, this.values.length);
      return this.values[previousIndex];
    } else {
      return this.defaultValue;
    }
  }

  public next(value: string): T {
    let anyValue = value as any;
    let index = this.values.indexOf(anyValue);
    if (index >= 0) {
      let nextIndex = FloorMath.mod(index + 1, this.values.length);
      return this.values[nextIndex];
    } else {
      return this.defaultValue;
    }
  }

  public static create<T extends string>(values: {0: T} & ArrayLike<T>): LiteralUtilType<T> {
    let castValues = Array.from(values);
    let defaultValue = values[0];
    let is = function (value: string): value is T {
      let anyValue = value as any;
      return castValues.indexOf(anyValue) >= 0;
    };
    let result = new LiteralUtilType(castValues, defaultValue, is);
    return result;
  }

}


export type LiteralType<T> = T extends {[key: number]: infer U} ? U : never;