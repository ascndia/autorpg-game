import EventEmitter from 'events';
import Team from '../Team.js';
import Resolver from '../TargetResolver.js';
import Base from '../../hero/Base.js';
import TargetResolver from '../TargetResolver.js';
import { ActionHandler } from '../handler/ActionHandler.js';
import { delay } from '../../utils.js';
import { TICK } from '../../constant.js';

interface Params {
  TEAM1: Team;
  TEAM2: Team;
  ROUND: number;
  Handler: ActionHandler;
  Emitter: EventEmitter;
}

export default class Round {
  constructor({ TEAM1, TEAM2, ROUND, Handler, Emitter }: Params) {
    this.TEAM1 = TEAM1;
    this.TEAM2 = TEAM2;
    this.ROUND = ROUND;
    this.Emitter = Emitter;
    this.ActionHandler = Handler;
    this.Resolver = new Resolver(this.TEAM1, this.TEAM2);
    this.REMAINING_HEROES = [];
  }
  private TEAM1: Team;
  private TEAM2: Team;
  private REMAINING_HEROES: Base[];
  private CALCULATED_INITIAL_HEROES: Base[];
  private CURR_HERO: Base;
  private readonly ROUND: number;
  private ActionHandler: ActionHandler;
  private Resolver: Resolver;
  private Emitter: EventEmitter;

  public async run() {
    await this.RoundStarting();
    await this.RoundStarted();
    await this.LoopTurn();
    await this.RoundEnding();
    await this.RoundEnded();
  }

  private async LoopTurn() {
    while (!this.calculateLose() || !this.isRoundEnd()) {
      console.log(this.REMAINING_HEROES);
      await this.TurnStarting();
      await this.TurnStarted();
      await this.LaunchAction();
      await this.TurnEnding();
      await this.TurnEnded();
    }
    console.log('LELELELE', this);
  }

  // ROUND METHODS
  private async RoundStarting() {
    // this.Emitter.emit('log:round-starting');
    this.calculateInitial();
    this.Emitter.emit(
      'battle:calculated:initial',
      this.CALCULATED_INITIAL_HEROES,
    );
    await delay(TICK);
  }
  private async RoundStarted() {
    this.Emitter.emit('battle:round:started', this.ROUND);
    await delay(TICK);
  }
  private async RoundEnding() {
    this.Emitter.emit('battle:round:ending', this.ROUND);
    await delay(TICK);
  }
  private async RoundEnded() {
    this.checkEnding();
    this.Emitter.emit('battle:round:ended', this.ROUND);
    await delay(TICK);
  }

  // TURN METHODS
  private async TurnStarting() {
    this.calculateCurrHero();
    this.Emitter.emit('battle:turn:starting', this.CURR_HERO);
    this.Emitter.emit('battle:turn:calculating:curr', this.CURR_HERO);
    this.Emitter.emit('battle:turn:calculated:curr', this.CURR_HERO);
    await delay(TICK);
  }
  private async TurnStarted() {
    this.Emitter.emit('battle:turn:started', this.CURR_HERO);
    await delay(TICK);
  }
  private async TurnEnding() {
    this.Emitter.emit('battle:turn:ending', this.CURR_HERO);
    await delay(TICK);
  }
  private async TurnEnded() {
    this.Emitter.emit('battle:turn:ended', this.CURR_HERO);
    await delay(TICK);
  }

  // ACTION METHODS
  private async LaunchAction() {
    this.Emitter.emit('battle:hero:action', this.CURR_HERO);
    await this.ActionHandler.handle(this.CURR_HERO.update());
    // await delay(TICK);
  }

  // UTILS
  private isRoundEnd() {
    return this.REMAINING_HEROES.length === 0;
  }
  private isBattleEnd() {
    return this.calculateLose();
  }
  private checkEnding() {
    if (this.isBattleEnd()) {
      this.Emitter.emit('battle:ending');
    }
  }

  private calculateInitial(): void {
    this.REMAINING_HEROES = this.Resolver.sortInitial();
    this.CALCULATED_INITIAL_HEROES = this.REMAINING_HEROES;
  }
  private calculateCurrHero(): void {
    this.CURR_HERO = TargetResolver.sortByHighestSpeed(
      this.REMAINING_HEROES,
    )[0];
    this.REMAINING_HEROES.shift();
  }
  private calculateLose(): boolean {
    return this.TEAM1.isLose() === true || this.TEAM2.isLose() === true;
  }
}
