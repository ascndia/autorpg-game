import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Alice extends Base {
  constructor() {
    super('Alice');
    this.attribute = new Attributes({ health: 1200, speed: 300 });
  }

  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Alice launch attack with damage 200`,
      caster: this,
      damage: 200,
      target: {
        teamId: this.teamId,
        subject: 'enemy',
        type: 'all',
        number: 0,
        position: 'all',
      },
      events: [],
    };
    return [action];
  }

  public update() {
    return this.state.update();
  }
}
