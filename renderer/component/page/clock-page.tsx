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
    mode: "gregorian",
    gregorianCalendar: new GregorianCalendar(),
    hairianCalendar: new HairianCalendar()
  };

  public constructor(props: any) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.timer = setInterval(() => this.setState({}), 10);
    window.addEventListener("keydown", this.toggleMode);
  }

  public async componentWillUnmount(): Promise<void> {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
    window.removeEventListener("keydown", this.toggleMode);
  }

  private toggleMode(event: KeyboardEvent): void {
    let key = event.key;
    if (key === "ArrowRight") {
      let mode = CalendarModeUtil.next(this.state.mode);
      this.setState({mode});
    } else if (key === "ArrowLeft") {
      let mode = CalendarModeUtil.previous(this.state.mode);
      this.setState({mode});
    }
  }

  private updateCalendars(): void {
    this.state.gregorianCalendar.update();
    this.state.hairianCalendar.update();
  }

  public render(): ReactNode {
    this.updateCalendars();
    let calendar = (() => {
      let mode = this.state.mode;
      if (mode === "gregorian") {
        return this.state.gregorianCalendar;
      } else if (mode === "hairian") {
        return this.state.hairianCalendar;
      } else {
        return this.state.gregorianCalendar;
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
  mode: CalendarMode,
  gregorianCalendar: GregorianCalendar,
  hairianCalendar: HairianCalendar
};

const CALENDAR_MODES = ["gregorian", "hairian", "stopwatch"] as const;
export let CalendarModeUtil = LiteralUtilType.create(CALENDAR_MODES);
export type CalendarMode = LiteralType<typeof CALENDAR_MODES>;