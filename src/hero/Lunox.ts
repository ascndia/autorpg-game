import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Lunox extends Base {
  constructor() {
    super('Lunox');
    this.attribute = new Attributes({ health: 1100, speed: 310 });
  }

  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Lunox launch attack with damage 500`,
      caster: this,
      damage: 500,
      target: {
        teamId: this.teamId,
        subject: 'enemy',
        type: 'default',
        number: 1,
        position: 'all',
        sortType: {
          sortBy: 'health',
          sortDirection: 'DESC',
        },
      },
      events: [],
    };
    return [action];
  }

  public update() {
    return this.state.update();
  }
}
