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
    let node = (
      <div className="clock-root">
        <div className="date-wrapper">
          <div className="date">
            <Letter content={calendar.year} length={4} weekday={weekday} size="small"/>
            <Letter content="/" weekday={weekday} size="small"/>
            <Letter content={calendar.month} length={2} weekday={weekday} size="small"/>
            <Letter content="/" weekday={weekday} size="small"/>
            <Letter content={calendar.day} length={2} weekday={weekday} size="small"/>
          </div>
          <div className="hairia">
            <Letter content={calendar.hairia} length={4} weekday={weekday} size="small"/>
          </div>
        </div>
        <div className="time">
          <Letter content={calendar.hour} length={2} weekday={weekday}/>
          <Letter content=":" weekday={weekday}/>
          <Letter content={calendar.minute} length={2} weekday={weekday}/>
          <Letter content=":" weekday={weekday}/>
          <Letter content={calendar.second} length={2} weekday={weekday}/>
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