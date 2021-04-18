//


export class StringUtil {

  public static padZero<U extends null | undefined>(number: number | string | U, length: number): string | U {
    if (number === null || number === undefined) {
      return number;
    } else {
      let preceding = new Array(length).join("0");
      let result = (preceding + number).slice(-length);
      return result;
    }
  }

}