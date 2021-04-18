//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  LiteralType,
  LiteralUtilType
} from "../../module/literal-type";
import {
  Component
} from "../component";


export class Letter extends Component<Props, State> {

  public static defaultProps: Props = {
    content: "",
    weekday: "sunday",
    holiday: false,
    size: "large"
  };

  public render(): ReactNode {
    let classNames = ["letter-root", this.props.size, this.props.className];
    let digitClassNames = ["letter-digit", this.props.weekday, (this.props.holiday) ? "holiday" : undefined];
    let string = this.props.content ?? "";
    let stringNodes = string.split("").map((char, index) => {
      let stringNode = <div className={digitClassNames.join(" ")} data-char={char} key={index}>{char}</div>;
      return stringNode;
    });
    let node = (
      <div className={classNames.join(" ")}>
        {stringNodes}
      </div>
    );
    return node;
  }

}


type Props = {
  content: string | null,
  weekday: Weekday,
  holiday: boolean,
  size: "large" | "small",
  className?: string
};
type State = {
};

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
export let WeekdayUtil = LiteralUtilType.create(WEEKDAYS);
export type Weekday = LiteralType<typeof WEEKDAYS>;