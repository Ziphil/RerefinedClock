//

import {
  BrowserWindowConstructorOptions,
  ipcRenderer
} from "electron";
import {
  Component as ReactComponent
} from "react";


export class Component<P, S, H = any> extends ReactComponent<P, S, H> {

  public state!: S;

}


export class PageComponent<P, S, H = any> extends Component<{id: string} & P, S, H> {

  protected fitWindow(): void {
    let id = this.props.id;
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    ipcRenderer.send("resize", id, width, height);
  }

  protected createWindow(mode: string, props: object, options: BrowserWindowConstructorOptions): void {
    let id = this.props.id;
    ipcRenderer.send("create-window", mode, id, props, options);
  }

}