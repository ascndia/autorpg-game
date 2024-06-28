import { UIEventHandler } from './handler/UIEventHandler.js';
import Team from './Team.js';
import RenderGenerator from './Renderer.js';
import UIState from './UIState.js';
import EventEmitter from 'events';

export default class UIEngine {
  constructor(Emitter: EventEmitter) {
    this.STATE = new UIState();
    this.Handler = new UIEventHandler(this.STATE, Emitter);
    this.RenderEngine = new RenderGenerator(this.STATE);
  }

  private RenderEngine: RenderGenerator;
  private STATE: UIState;
  private Handler: UIEventHandler;

  public Init(team1: Team, team2: Team) {
    // this.STATE.Init(team1, team2);
    team1;
    team2;
  }

  public getHandler() {
    return this.Handler;
  }

  public render() {
    return this.RenderEngine.render();
  }
}
