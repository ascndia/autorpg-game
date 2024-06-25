import Attributes from '../attribute/Attributes.js';
import {
  InfoEvent,
  EVENT_TYPE,
  AttackEvent,
} from '../types-interface-states-enum/Event.js';
import Base from './Base.js';

export default class Minamoto extends Base {
  constructor() {
    super('Minamoto');
    this.attribute = new Attributes({ health: 1000 });
  }
  public attack() {
    const displayUIMessageEvent: InfoEvent = {
      type: EVENT_TYPE.INFO,
      text: `minamoto launch attack with damage 350`,
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
