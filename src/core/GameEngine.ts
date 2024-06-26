import BattleEngine from './BattleEngine.js';
import Team from './Team.js';
import UIEngine from './UIEngine.js';
import { IEvent } from '../types-interface-states-enum/Event.js';
import EventEngine from './EventEngine.js';

export default class GameEngine {
  private BattleEngine: BattleEngine;
  private UIEngine: UIEngine;
  private EventEngine: EventEngine;
  constructor() {
    this.BattleEngine = new BattleEngine(this);
    this.EventEngine = new EventEngine(this);
    this.UIEngine = new UIEngine(this);

    this.EventEngine.register(this.BattleEngine.getEventHandler());
    this.EventEngine.register(this.UIEngine.getHandler());
  }

  public assignTeam(team1: Team, team2: Team) {
    this.BattleEngine.team1 = team1;
    this.BattleEngine.team2 = team2;
  }

  public start(): void {
    this.BattleEngine.start();
  }

  public sendEvent(events: IEvent[]) {
    this.EventEngine.sendEvent(events);
  }

  public getTeam(id: 1 | 2) {
    if (id === 1) {
      return this.BattleEngine.team1;
    } else {
      return this.BattleEngine.team2;
    }
  }
}
