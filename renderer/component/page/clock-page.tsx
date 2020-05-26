//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  PageComponent
} from "../component";
import {
  Letter
} from "../compound/letter";


export class ClockPage extends PageComponent<Props, State> {

  private timer: any | null = null;

  public state: State = {
    date: new Date()
  };

  public async componentDidMount(): Promise<void> {
    this.timer = setInterval(() => {
      let date = new Date();
      this.setState({date});
    }, 10);
  }

  public async componentWillUnmount(): Promise<void> {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  public render(): ReactNode {
    let date = new Date();
    let node = (
      <div className="clock-root">
        <div className="date-wrapper">
          <div className="date">
            <Letter content={date.getFullYear()} length={4} size="small"/>
            <Letter content="/" size="small"/>
            <Letter content={date.getMonth() + 1} length={2} size="small"/>
            <Letter content="/" size="small"/>
            <Letter content={date.getDate()} length={2} size="small"/>
          </div>
          <div className="hairia">
            <Letter content={3047} length={4} size="small"/>
          </div>
        </div>
        <div className="time">
          <Letter content={date.getHours()} length={2}/>
          <Letter content=":"/>
          <Letter content={date.getMinutes()} length={2}/>
          <Letter content=":"/>
          <Letter content={date.getSeconds()} length={2}/>
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
  date: Date
};