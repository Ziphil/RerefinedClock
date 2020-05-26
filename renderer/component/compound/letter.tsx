//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  Component
} from "../component";


export class Letter extends Component<Props, State> {

  public static defaultProps: Props = {
    content: "",
    length: 1,
    size: "large"
  };

  private createString(): string {
    let padChar = (typeof this.props.content === "number") ? "0" : " ";
    let preceding = new Array(this.props.length).join(padChar);
    let string = (preceding + this.props.content.toString()).slice(-this.props.length);
    return string;
  }

  public render(): ReactNode {
    let classNames = ["letter-root", this.props.size];
    let digitClassNames = ["letter-digit", "monday"];
    let string = this.createString();
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
  content: number | string,
  length: number,
  size: "large" | "small"
};
type State = {
};