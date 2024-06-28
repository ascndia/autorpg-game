import EventEmitter from 'events';
import BattleEngine from './BattleEngine.js';
import Team from './Team.js';
import UIEngine from './UIEngine.js';

export default class GameEngine {
  private BattleEngine: BattleEngine;
  private UIEngine: UIEngine;
  private Emitter: EventEmitter;
  constructor() {
    this.Emitter = new EventEmitter();
    this.UIEngine = new UIEngine(this.Emitter);
    this.BattleEngine = new BattleEngine(this.Emitter);
  }

  public assignTeam(team1: Team, team2: Team) {
    this.BattleEngine.Init(team1, team2);
    this.UIEngine.Init(team1, team2);
  }

  public start(): void {
    this.BattleEngine.start();
  }
}
