import Attributes from '../attribute/Attributes.js';
import {
  InfoEvent,
  EVENT_TYPE,
  AttackEvent,
} from '../types-interface-states-enum/Event.js';
import Base from './Base.js';

export default class Geester extends Base {
  constructor() {
    super('Geester');
    this.attribute = new Attributes({ health: 1000 });
  }
  public attack() {
    const displayUIMessageEvent: InfoEvent = {
      type: EVENT_TYPE.INFO,
      text: `geester launch attack with damage 100`,
    };
    const event: AttackEvent = {
      type: EVENT_TYPE.ATTACK,
      caster: this,
      damage: 100,
    };
    return [displayUIMessageEvent, event];
  }

  public update() {
    return this.state.update();
  }
}
