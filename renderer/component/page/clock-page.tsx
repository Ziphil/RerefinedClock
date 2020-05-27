//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  GregorianCalendar,
  HairianCalendar
} from "../../module/calendar";
import {
  LiteralType,
  LiteralUtilType
} from "../../module/literal-util";
import {
  PageComponent
} from "../component";
import {
  Clock
} from "../compound";


export class ClockPage extends PageComponent<Props, State> {

  private timer: any | null = null;

  public state: State = {
    mode: "gregorian"
  };

  public async componentDidMount(): Promise<void> {
    this.timer = setInterval(() => {
      this.setState({});
    }, 10);
    window.addEventListener("keydown", (event) => {
      let key = event.key;
      if (key === "ArrowRight") {
        let mode = CalendarModeUtil.next(this.state.mode);
        this.setState({mode});
      } else if (key === "ArrowLeft") {
        let mode = CalendarModeUtil.previous(this.state.mode);
        this.setState({mode});
      }
    });
  }

  public async componentWillUnmount(): Promise<void> {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  public render(): ReactNode {
    let date = new Date();
    let calendar = (() => {
      let mode = this.state.mode;
      if (mode === "gregorian") {
        return new GregorianCalendar(date);
      } else if (mode === "hairian") {
        return new HairianCalendar(date);
      } else {
        return new GregorianCalendar(date);
      }
    })();
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
  mode: CalendarMode
};

const CALENDAR_MODES = ["gregorian", "hairian", "stopwatch"] as const;
let CalendarModeUtil = LiteralUtilType.create(CALENDAR_MODES);
type CalendarMode = LiteralType<typeof CALENDAR_MODES>;