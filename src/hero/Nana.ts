import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Nana extends Base {
  constructor() {
    super('Nana');
    this.attribute = new Attributes({ health: 900, speed: 350 });
  }

  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Nana launch attack with damage 400`,
      caster: this,
      damage: 400,
      target: {
        teamId: this.teamId,
        subject: 'enemy',
        type: 'random',
        number: 2,
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
