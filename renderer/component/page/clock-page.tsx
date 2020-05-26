//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  HairianCalendar
} from "../../module/calendar";
import {
  PageComponent
} from "../component";
import {
  Letter
} from "../compound/letter";


export class ClockPage extends PageComponent<Props, State> {

  private timer: any | null = null;

  public async componentDidMount(): Promise<void> {
    this.timer = setInterval(() => this.setState({}), 10);
  }

  public async componentWillUnmount(): Promise<void> {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  public render(): ReactNode {
    let date = new Date();
    let calendar = new HairianCalendar(date);
    let node = (
      <div className="clock-root">
        <div className="date-wrapper">
          <div className="date">
            <Letter content={calendar.year} length={4} size="small"/>
            <Letter content="/" size="small"/>
            <Letter content={calendar.month} length={2} size="small"/>
            <Letter content="/" size="small"/>
            <Letter content={calendar.day} length={2} size="small"/>
          </div>
          <div className="hairia">
            <Letter content={calendar.hairia} length={4} size="small"/>
          </div>
        </div>
        <div className="time">
          <Letter content={calendar.hour} length={2}/>
          <Letter content=":"/>
          <Letter content={calendar.minute} length={2}/>
          <Letter content=":"/>
          <Letter content={calendar.second} length={2}/>
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
};