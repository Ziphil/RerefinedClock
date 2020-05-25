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
    length: 1
  };

  private createString(): string {
    let padChar = (typeof this.props.content === "number") ? "0" : " ";
    let preceding = new Array(this.props.length).join(padChar);
    let string = (preceding + this.props.content.toString()).slice(-this.props.length);
    return string;
  }

  public render(): ReactNode {
    let string = this.createString();
    let stringNodes = string.split("").map((char, index) => {
      return <div className="letter-digit" key={index}>{char}</div>;
    });
    let node = (
      <div className="letter-root">
        {stringNodes}
      </div>
    );
    return node;
  }

}


type Props = {
  content: number | string,
  length: number
};
type State = {
};