//

import {
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  app as electronApp,
  ipcMain,
  screen
} from "electron";
import {
  client
} from "electron-connect";
import {
  join as joinPath
} from "path";


const COMMON_WINDOW_OPTIONS = {
  transparent: true,
  frame: false,
  toolbar: false,
  alwaysOnTop: true,
  resizable: true,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,
  autoHideMenuBar: true,
  acceptFirstMouse: true,
  useContentSize: true,
  webPreferences: {nodeIntegration: true, devTools: true}
};
const PRODUCTION_WINDOW_OPTIONS = {
  resizable: false,
  webPreferences: {nodeIntegration: true, devTools: false}
};


class Main {

  private app: App;
  private windows: Map<string, BrowserWindow>;
  private props: Map<string, object>;

  public constructor(app: App) {
    this.app = app;
    this.windows = new Map();
    this.props = new Map();
  }

  public main(): void {
    this.setupEventHandlers();
    this.setupIpc();
  }

  private setupEventHandlers(): void {
    this.app.on("ready", () => {
      this.createMainWindow();
    });
    this.app.on("activate", () => {
      if (this.windows.size <= 0) {
        this.createMainWindow();
      }
    });
    this.app.on("window-all-closed", () => {
      this.app.quit();
    });
  }

  private setupIpc(): void {
    ipcMain.on("create-window", (event, mode, parentId, props, options) => {
      this.createWindow(mode, parentId, props, options);
    });
    ipcMain.on("ready-get-props", (event, id) => {
      event.reply("get-props", this.props.get(id));
      this.props.delete(id);
    });
    ipcMain.on("ready-show", (event, id) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        window.show();
      }
    });
    ipcMain.on("resize", (event, id, width, height) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        window.setContentSize(width, height);
      }
    });
    ipcMain.on("move-default-position", (event, id) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        this.moveDefaultPosition(window);
      }
    });
  }

  private createWindow(mode: string, parentId: string | null, props: object, options: BrowserWindowConstructorOptions): BrowserWindow {
    let show = false;
    let parent = (parentId !== null) ? this.windows.get(parentId) : undefined;
    let additionalOptions = (this.isDevelopment()) ? {} : PRODUCTION_WINDOW_OPTIONS;
    let window = new BrowserWindow({...COMMON_WINDOW_OPTIONS, ...additionalOptions, show, parent, ...options});
    let id = window.id.toString();
    window.loadFile(joinPath(__dirname, "index.html"), {query: {id, mode}});
    window.once("closed", () => {
      this.windows.delete(id);
    });
    if (!this.isDevelopment()) {
      window.setMenu(null);
    }
    this.windows.set(id, window);
    this.props.set(id, props);
    return window;
  }

  private createMainWindow(): BrowserWindow {
    let options = {width: 380, height: 117, minWidth: 380, minHeight: 117};
    let window = this.createWindow("clock", null, {}, options);
    this.moveDefaultPosition(window);
    this.connectReloadClient(window);
    return window;
  }

  private moveDefaultPosition(window: BrowserWindow): void {
    let displayBounds = screen.getPrimaryDisplay().bounds;
    let windowBounds = window.getBounds();
    let x = displayBounds.width - windowBounds.width - 15;
    let y = displayBounds.height - windowBounds.height - 40;
    window.setPosition(x, y);
  }

  private connectReloadClient(window: BrowserWindow): void {
    if (this.isDevelopment()) {
      client.create(window, {}, () => {
        console.log("Reload client connected");
      });
    }
  }

  private isDevelopment(): boolean {
    return process.env["NODE_ENV"] === "development";
  }

}


let main = new Main(electronApp);
main.main();