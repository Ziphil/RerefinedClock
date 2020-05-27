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
  Clock
} from "../compound";


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
      <div className="clock-page-root">
        <Clock calendar={calendar}/>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
};