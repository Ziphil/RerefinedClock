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

  public state: State = {
  };

  public async componentDidMount(): Promise<void> {
  }

  public render(): ReactNode {
    let date = new Date();
    let node = (
      <div className="clock-root">
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
};