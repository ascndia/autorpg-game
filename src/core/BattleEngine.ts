import BattleField from './Battle/BattleField.js';
import Team from './Team.js';
import EventEmitter from 'events';

export default class BattleEngine {
  constructor(Emitter: EventEmitter) {
    this.BattleField = new BattleField(Emitter);
    this.Emitter = Emitter;
  }
  private Emitter: EventEmitter;
  private BattleField: BattleField;

  public Init(team1: Team, team2: Team) {
    this.BattleField.Init(team1, team2);
    this.Emitter.emit('log:battle-engine-starting');
  }

  public start() {
    this.BattleField.start();
  }
}
