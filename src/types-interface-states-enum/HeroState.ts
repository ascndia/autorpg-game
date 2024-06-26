import { IAction } from './Action.js';
import { IHeroInstance } from './HeroInstance.js';

export type HeroStates = HeroDeadState | HeroIdleState;

export interface IHeroState {
  update: (h: IHeroInstance) => IAction[];
  type: string;
}

export class HeroIdleState implements IHeroState {
  private hero: IHeroInstance;
  public readonly type: string;

  constructor(h: IHeroInstance) {
    this.hero = h;
    this.type = 'IDLE';
  }
  public update() {
    return [...(this.hero.attack() as IAction[])];
  }
}

export class HeroDeadState implements IHeroState {
  private hero: IHeroInstance;
  public readonly type: string;

  constructor(h: IHeroInstance) {
    this.hero = h;
    this.type = 'DEAD';
    this.hero;
  }
  public update() {
    return [];
    // this.hero.update();
  }
}
