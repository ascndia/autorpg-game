import { EventEmitter } from 'events';
import UIState from '../UIState.js';
import Base from '../../hero/Base.js';
import Team from '../Team.js';

export class UIEventHandler {
  constructor(STATE: UIState, Emitter: EventEmitter) {
    this.STATE = STATE;
    this.Emitter = Emitter;
    this.register();
    // this.STATE.register(() => console.log(this.STATE));
  }
  private register() {
    this.Emitter.on('info', (message: string) =>
      this.STATE.ADD_MESSAGE(message),
    );
    this.Emitter.on('battle:starting', () => this.battleStarting());
    this.Emitter.on('battle:started', () => this.battleStarted());
    this.Emitter.on('battle:calculated:teams', (t) => this.setTeam(t));
    this.Emitter.on('battle:round:starting', (r) => this.roundStarting(r));
    this.Emitter.on('battle:round:started', (r) => this.roundStarted(r));
    this.Emitter.on('battle:round:ending', (r) => this.roundEnding(r));
    this.Emitter.on('battle:round:ended', (r) => this.roundEnded(r));
    this.Emitter.on('battle:turn:calculated:curr', (h) =>
      this.calculatedCurr(h),
    );
    this.Emitter.on('battle:turn:calculated:target', (t) =>
      this.calculatedTarget(t),
    );
    this.Emitter.on('battle:turn:starting', (h) => this.turnStarting(h));
    this.Emitter.on('battle:turn:started', (h) => this.turnStarted(h));
    this.Emitter.on('battle:turn:ending', (h) => this.turnEnding(h));
    this.Emitter.on('battle:turn:ended', (h) => this.turnEnded(h));

    // this.on('battle:', this.addMessage);
    // this.on('info', this.addMessage);
    // this.on('info', this.addMessage);
    // this.on('info', this.addMessage);
    // this.on('info', this.addMessage);
    // this.on('info', this.addMessage);
  }
  private STATE: UIState;
  private Emitter: EventEmitter;

  private setTeam({ TEAM1, TEAM2 }: { TEAM1: Team; TEAM2: Team }) {
    this.STATE.Init(TEAM1, TEAM2);
  }
  private battleStarting() {}
  private battleStarted() {}
  private calculatedCurr(HERO: Base) {
    this.STATE.CURR_HERO = HERO;
  }
  private calculatedTarget(TARGETS: Base[]) {
    this.STATE.TARGETS = TARGETS;
  }
  private roundStarting(ROUND: number) {
    this.STATE.CLEAR_MESSAGE();
    this.STATE.ROUND = ROUND;
    this.STATE.ADD_MESSAGE(`Round ${ROUND} Starting`);
  }
  private roundStarted(ROUND: number) {
    this.STATE.ADD_MESSAGE(`Round ${ROUND} Started`);
  }
  private roundEnding(ROUND: number) {
    this.STATE.ADD_MESSAGE(`Round ${ROUND} Ending`);
  }
  private roundEnded(ROUND: number) {
    this.STATE.ADD_MESSAGE(`Round ${ROUND} Ended`);
  }
  private turnStarting(HERO: Base) {
    this.STATE.CLEAR_MESSAGE();
    this.STATE.ADD_MESSAGE(`${HERO.name} Turn Starting`);
  }
  private turnStarted(HERO: Base) {
    this.STATE.ADD_MESSAGE(`${HERO.name} Turn Started`);
  }
  private turnEnding(HERO: Base) {
    this.STATE.ADD_MESSAGE(`${HERO.name} Turn Ending`);
    this.STATE.CLEAR_TARGETS();
  }
  private turnEnded(HERO: Base) {
    this.STATE.ADD_MESSAGE(`${HERO.name} Turn Ended`);
  }
}
