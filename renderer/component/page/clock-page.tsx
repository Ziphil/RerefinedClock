//

import {
  ipcRenderer
} from "electron";
import * as react from "react";
import {
  ReactNode
} from "react";
import {
  GregorianCalendar,
  HairianCalendar,
  StopwatchCalendar
} from "../../module/calendar";
import {
  LiteralType,
  LiteralUtilType
} from "../../module/literal-type";
import {
  PageComponent
} from "../component";
import {
  Clock
} from "../compound";


export class ClockPage extends PageComponent<Props, State> {

  public state: State = {
    mode: "gregorian",
    shift: true,
    gregorianCalendar: new GregorianCalendar(),
    hairianCalendar: new HairianCalendar(),
    stopwatchCalendar: new StopwatchCalendar()
  };

  public async componentDidMount(): Promise<void> {
    setInterval(() => {
      this.setState({});
    }, 10);
    window.addEventListener("keydown", (event) => {
      this.toggleMode(event);
      this.toggleShift(event);
      this.moveDefaultPosition(event);
      if (this.state.mode === "stopwatch") {
        this.operateStopwatch(event);
      }
    });
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

  private toggleShift(event: KeyboardEvent): void {
    let key = event.key;
    if (key === "ArrowUp" || key === "ArrowDown") {
      let shift = !this.state.shift;
      this.setState({shift});
    }
  }

  private operateStopwatch(event: KeyboardEvent): void {
    let key = event.key;
    let calendar = this.state.stopwatchCalendar;
    if (key === " " || key === "Enter") {
      calendar.startOrStop();
    } else if (key === "Backspace") {
      calendar.reset();
    } else if (key === "7") {
      calendar.addOffset(3600000);
    } else if (key === "1") {
      calendar.addOffset(-3600000);
    } else if (key === "8") {
      calendar.addOffset(60000);
    } else if (key === "2") {
      calendar.addOffset(-60000);
    } else if (key === "9") {
      calendar.addOffset(1000);
    } else if (key === "3") {
      calendar.addOffset(-1000);
    }
  }

  private moveDefaultPosition(event: KeyboardEvent): void {
    let key = event.key;
    if (key === "F5") {
      let id = this.props.id;
      ipcRenderer.send("move-default-position", id);
    }
  }

  private updateCalendars(): void {
    let shift = this.state.shift;
    this.state.gregorianCalendar.update(shift);
    this.state.hairianCalendar.update(shift);
    this.state.stopwatchCalendar.update(shift);
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
        return this.state.stopwatchCalendar;
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
  shift: boolean,
  gregorianCalendar: GregorianCalendar,
  hairianCalendar: HairianCalendar,
  stopwatchCalendar: StopwatchCalendar
};

const CALENDAR_MODES = ["gregorian", "hairian", "stopwatch"] as const;
export let CalendarModeUtil = LiteralUtilType.create(CALENDAR_MODES);
export type CalendarMode = LiteralType<typeof CALENDAR_MODES>;