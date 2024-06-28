import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Alpha extends Base {
  constructor() {
    super('Alpha');
    this.attribute = new Attributes({ health: 1600 });
  }
  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Alpha launch attack with damage 250`,
      caster: this,
      damage: 250,
      target: {
        teamId: this.teamId,
        subject: 'enemy',
        type: 'all',
        number: 0,
        position: 'front',
      },
      events: [],
    };
    return [action];
  }

  public update() {
    return this.state.update();
  }
}
