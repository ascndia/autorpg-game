import { IEvent } from './Event.js';
import { IHeroInstance } from './HeroInstance.js';

export type HeroStates = HeroDeadState | HeroIdleState;

export interface IHeroState {
  update: (h: IHeroInstance) => IEvent[];
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
    return [...(this.hero.attack() as IEvent[])];
  }
}

export class HeroDeadState implements IHeroState {
  private hero: IHeroInstance;
  public readonly type: string;

  constructor(h: IHeroInstance) {
    this.hero = h;
    this.type = 'DEAD';
  }
  public update() {
    return [...(this.hero.attack() as IEvent[])];
    // this.hero.update();
  }
}
