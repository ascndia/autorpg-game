import Attributes from '../attribute/Attributes.js';
import {
  ACTION_TYPE,
  AttackAction,
} from '../types-interface-states-enum/Action.js';
import Base from './Base.js';

export default class Lancelot extends Base {
  constructor() {
    super('Lancelot');
    this.attribute = new Attributes({ health: 900, speed: 300 });
  }

  public attack() {
    const action: AttackAction = {
      type: ACTION_TYPE.ATTACK,
      text: `Lancelot launch attack with damage 380`,
      caster: this,
      damage: 380,
      target: {
        teamId: this.teamId,
        subject: 'enemy',
        type: 'random',
        number: 2,
        position: 'back',
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
