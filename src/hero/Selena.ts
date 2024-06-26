import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Selena extends Base {
  constructor() {
    super('Selena');
    this.attribute = new Attributes({ health: 1000, speed: 500 });
  }

  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Selena launch attack with damage 500`,
      caster: this,
      damage: 500,
      targetType: 1,
      events: [],
    };
    return [action];
  }

  public update() {
    return this.state.update();
  }
}
