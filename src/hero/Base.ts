import Attributes from '../attribute/Attributes.js';
import { IEvent } from '../types-interface-states-enum/Event.js';
import { IHeroInstance } from '../types-interface-states-enum/HeroInstance.js';
import {
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
  protected attribute: Attributes;
  protected state: HeroStates;

  public getState(): HeroStates {
    return this.state;
  }
  public take({ damage }: { damage: number }) {
    this.attribute.health -= damage;
  }
  public abstract update(): IEvent[];
  public abstract attack(): IEvent[];
}
