import Base from '../hero/Base.js';
import Team from './Team.js';

export default class UIState {
  constructor() {
    this.state = {
      TEAM1: null,
      TEAM2: null,
      CURR_HERO: null,
      TARGETS: [],
      MESSAGES: [],
      ROUND: null,
    };
    this.callbacks = [];
  }
  private callbacks: (() => void)[];
  public register(fn: () => void) {
    this.callbacks.push(fn);
  }
  public Init(team1: Team, team2: Team) {
    this.state.TEAM1 = team1;
    this.state.TEAM2 = team2;
  }
  private onUpdate() {
    this.callbacks.forEach((cb) => cb());
  }
  private state: {
    TEAM1: Team;
    TEAM2: Team;
    CURR_HERO: Base;
    TARGETS: Base[];
    MESSAGES: string[];
    ROUND: number;
  };

  get CURR_HERO() {
    return this.state.CURR_HERO;
  }
  get TEAM1() {
    return this.state.TEAM1;
  }
  get TEAM2() {
    return this.state.TEAM2;
  }
  get TARGETS() {
    return this.state.TARGETS;
  }
  get ROUND() {
    return this.state.ROUND;
  }
  get MESSAGES() {
    return this.state.MESSAGES;
  }
  set CURR_HERO(h: Base) {
    this.state.CURR_HERO = h;
    this.onUpdate();
  }
  set TARGETS(t: Base[]) {
    this.state.TARGETS = t;
    this.onUpdate();
  }
  set ROUND(r: number) {
    this.state.ROUND = r;
    this.onUpdate();
  }
  set TEAM1(t: Team) {
    this.state.TEAM1 = t;
    this.onUpdate();
  }
  set TEAM2(t: Team) {
    this.state.TEAM2 = t;
    this.onUpdate();
  }
  public ADD_MESSAGE(m: string) {
    this.state.MESSAGES.push(m);
    this.onUpdate();
  }
  public CLEAR_MESSAGE() {
    this.state.MESSAGES = [];
    this.onUpdate();
  }
  public CLEAR_TARGETS() {
    this.state.TARGETS = [];
    this.onUpdate();
  }
}
