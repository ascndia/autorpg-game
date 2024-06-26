import Attributes from '../attribute/Attributes.js';
import { IAction } from '../types-interface-states-enum/Action.js';
import { IHeroInstance } from '../types-interface-states-enum/HeroInstance.js';
import {
  HeroDeadState,
  HeroIdleState,
  HeroStates,
} from '../types-interface-states-enum/HeroState.js';

export default abstract class Base implements IHeroInstance {
  constructor(name: string) {
    this.state = new HeroIdleState(this);
    this.teamId = undefined;
    this.name = name;
  }
  public teamId: undefined | 1 | 2;
  public name: string;
  public attribute: Attributes;
  protected state: HeroStates;

  public getState(): HeroStates {
    return this.state;
  }
  public take({ damage }: { damage: number }): IAction[] {
    this.attribute.health -= damage;
    if (this.attribute.health <= 0) {
      this.state = new HeroDeadState(this);
    }
    return [];
  }
  public abstract update(): IAction[];
  public abstract attack(): IAction[];
}
