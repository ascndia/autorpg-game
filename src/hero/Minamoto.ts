import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Minamoto extends Base {
  constructor() {
    super('Minamoto');
    this.attribute = new Attributes({ health: 1000 });
  }
  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Minamoto launch attack with damage 250`,
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
