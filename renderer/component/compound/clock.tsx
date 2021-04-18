//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  Calendar
} from "../../module/calendar";
import {
  StringUtil
} from "../../module/string";
import {
  Component
} from "../component";
import {
  Letter,
  WeekdayUtil
} from ".";


export class Clock extends Component<Props, State> {

  public render(): ReactNode {
    let calendar = this.props.calendar;
    let weekday = WeekdayUtil.cast(calendar.weekday);
    let holiday = calendar.holiday;
    let showDate = calendar.year !== null && calendar.month !== null && calendar.day !== null;
    let showHairia = calendar.hairia !== null;
    let showTime = calendar.hour !== null && calendar.minute !== null && calendar.second !== null;
    let yearContent = (calendar.type !== null) ? "  " + StringUtil.padZero(calendar.year, 2) : StringUtil.padZero(calendar.year, 4);
    let dateClassNames = ["date", (showDate) ? undefined : "hidden"];
    let hairiaClassNames = ["hairia", (showHairia) ? undefined : "hidden"];
    let timeClassNames = ["time", (showTime) ? undefined : "hidden"];
    let node = (
      <div className="clock-root">
        <div className="date-wrapper">
          <div className={dateClassNames.join(" ")}>
            <div className="year-wrapper">
              <Letter className="type" content={calendar.type} weekday={weekday} holiday={holiday} size="small"/>
              <Letter content={yearContent} weekday={weekday} holiday={holiday} size="small"/>
            </div>
            <Letter className="slash" content="/" weekday={weekday} holiday={holiday} size="small"/>
            <Letter content={StringUtil.padZero(calendar.month, 2)} weekday={weekday} holiday={holiday} size="small"/>
            <Letter className="slash" content="/" weekday={weekday} holiday={holiday} size="small"/>
            <Letter content={StringUtil.padZero(calendar.day, 2)} weekday={weekday} holiday={holiday} size="small"/>
          </div>
          <div className={hairiaClassNames.join(" ")}>
            <Letter content={StringUtil.padZero(calendar.hairia, 4)} weekday={weekday} holiday={holiday} size="small"/>
          </div>
        </div>
        <div className={timeClassNames.join(" ")}>
          <Letter content={StringUtil.padZero(calendar.hour, 2)} weekday={weekday} holiday={holiday}/>
          <Letter className="colon" content=":" weekday={weekday} holiday={holiday}/>
          <Letter content={StringUtil.padZero(calendar.minute, 2)} weekday={weekday} holiday={holiday}/>
          <Letter className="colon" content=":" weekday={weekday} holiday={holiday}/>
          <Letter content={StringUtil.padZero(calendar.second, 2)} weekday={weekday} holiday={holiday}/>
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
  calendar: Calendar
};
type State = {
};