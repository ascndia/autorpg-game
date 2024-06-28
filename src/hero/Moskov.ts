import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Moskov extends Base {
  constructor() {
    super('Moskov');
    this.attribute = new Attributes({ health: 1000, speed: 330 });
  }

  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Moskov launch attack with damage 300`,
      caster: this,
      damage: 300,
      target: {
        teamId: this.teamId,
        subject: 'enemy',
        type: 'random',
        number: 3,
        position: 'back',
      },
      events: [],
    };
    return [action];
  }

  public update() {
    return this.state.update();
  }
}
