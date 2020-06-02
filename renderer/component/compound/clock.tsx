//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  Calendar
} from "../../module/calendar";
import {
  Component
} from "../component";
import {
  Letter,
  WeekdayUtil
} from "./";


export class Clock extends Component<Props, State> {

  public render(): ReactNode {
    let calendar = this.props.calendar;
    let weekday = WeekdayUtil.cast(calendar.weekday);
    let holiday = calendar.holiday;
    let showDate = calendar.year !== null && calendar.month !== null && calendar.day !== null;
    let showHairia = calendar.hairia !== null;
    let showTime = calendar.hour !== null && calendar.minute !== null && calendar.second !== null;
    let dateClassNames = ["date", (showDate) ? undefined : "hidden"];
    let hairiaClassNames = ["hairia", (showHairia) ? undefined : "hidden"];
    let timeClassNames = ["time", (showTime) ? undefined : "hidden"];
    let node = (
      <div className="clock-root">
        <div className="date-wrapper">
          <div className={dateClassNames.join(" ")}>
            <Letter content={calendar.year} length={4} weekday={weekday} holiday={holiday} size="small"/>
            <Letter className="slash" content="/" weekday={weekday} holiday={holiday} size="small"/>
            <Letter content={calendar.month} length={2} weekday={weekday} holiday={holiday} size="small"/>
            <Letter className="slash" content="/" weekday={weekday} holiday={holiday} size="small"/>
            <Letter content={calendar.day} length={2} weekday={weekday} holiday={holiday} size="small"/>
          </div>
          <div className={hairiaClassNames.join(" ")}>
            <Letter content={calendar.hairia} length={4} weekday={weekday} holiday={holiday} size="small"/>
          </div>
        </div>
        <div className={timeClassNames.join(" ")}>
          <Letter content={calendar.hour} length={2} weekday={weekday} holiday={holiday}/>
          <Letter className="colon" content=":" weekday={weekday} holiday={holiday}/>
          <Letter content={calendar.minute} length={2} weekday={weekday} holiday={holiday}/>
          <Letter className="colon" content=":" weekday={weekday} holiday={holiday}/>
          <Letter content={calendar.second} length={2} weekday={weekday} holiday={holiday}/>
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