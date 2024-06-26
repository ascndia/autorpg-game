import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';

import Base from './Base.js';

export default class Geester extends Base {
  constructor() {
    super('Geester');
    this.attribute = new Attributes({ health: 800, speed: 280 });
  }
  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Geester launch attack with damage 500`,
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
          sortDirection: 'ASC',
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
