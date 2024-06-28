import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Belerick extends Base {
  constructor() {
    super('Belerick');
    this.attribute = new Attributes({ health: 3500, speed: 290 });
  }

  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Belerick launch attack with damage 250`,
      caster: this,
      damage: 250,
      target: {
        teamId: this.teamId,
        subject: 'enemy',
        type: 'random',
        number: 1,
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
