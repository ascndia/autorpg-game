import Attributes from '../attribute/Attributes.js';
import {
  InfoEvent,
  EVENT_TYPE,
  AttackEvent,
} from '../types-interface-states-enum/Event.js';
import Base from './Base.js';

export default class Selena extends Base {
  constructor() {
    super('Selena');
    this.attribute = new Attributes({ health: 1000 });
  }

  public attack() {
    const displayUIMessageEvent: InfoEvent = {
      type: EVENT_TYPE.INFO,
      text: `selena launch attack with damage 200`,
    };
    const attackEvent: AttackEvent = {
      type: EVENT_TYPE.ATTACK,
      caster: this,
      damage: 200,
    };
    return [displayUIMessageEvent, attackEvent];
  }

  public update() {
    return this.state.update();
  }
}
