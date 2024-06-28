import EventEmitter from 'events';
import Team from '../Team.js';
import Round from './Round.js';
import { ActionHandler } from '../handler/ActionHandler.js';

export default class BattleField {
  constructor(Emitter: EventEmitter) {
    this.Emitter = Emitter;
  }
  private TEAM1: Team;
  private TEAM2: Team;
  private ROUND: number;
  public IS_BATTLE_END: boolean;
  private Emitter: EventEmitter;
  private ActionHandler: ActionHandler;

  public Init(TEAM1: Team, TEAM2: Team) {
    this.ROUND = 1;
    this.IS_BATTLE_END = false;
    this.TEAM1 = TEAM1;
    this.TEAM1.assignTeam(1);
    this.TEAM2 = TEAM2;
    this.TEAM2.assignTeam(2);
    this.ActionHandler = new ActionHandler(TEAM1, TEAM2, this.Emitter);
  }
  public start() {
    this.BattleStarting();
    this.BattleStarted();
    this.LoopBattle();
    this.BattleEnding();
    this.BattleEnded();
  }

  private BattleStarting() {
    this.Emitter.emit('battle:starting');
  }
  private BattleStarted() {
    this.Emitter.emit('battle:started');
    this.Emitter.emit('battle:calculated:teams', {
      TEAM1: this.TEAM1,
      TEAM2: this.TEAM2,
    });
  }
  private BattleEnding() {}
  private BattleEnded() {}

  private async LoopBattle() {
    while (!this.isBattleEnd()) {
      await this.LoopRound();
    }
  }
  private async LoopRound() {
    const R = new Round({
      TEAM1: this.TEAM1,
      TEAM2: this.TEAM2,
      ROUND: this.ROUND,
      Handler: this.ActionHandler,
      Emitter: this.Emitter,
    });
    await R.run();
    this.ROUND++;
  }
  private isBattleEnd(): boolean {
    return this.TEAM1.isLose() === true || this.TEAM2.isLose() === true;
  }
}
