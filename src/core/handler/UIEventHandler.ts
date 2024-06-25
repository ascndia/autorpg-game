import {
  EVENT_TYPE,
  IEvent,
  IEventHandler,
  InfoEvent,
  RoundUpdateEvent,
} from '../../types-interface-states-enum/Event.js';
import UIEngine from '../UIEngine.js';

export class UIEventHandler implements IEventHandler {
  constructor(Engine: UIEngine) {
    this.Engine = Engine;
    this.Engine;
  }
  private Engine: UIEngine;

  private render() {
    console.clear();
    this.Engine.render();
  }
  public handleOnEach() {}

  private messageHandler(e: InfoEvent) {
    this.Engine.setMessage(e.text);
    this.render();
  }

  private roundHandler(e: RoundUpdateEvent) {
    this.Engine.setRound(e.round);
    this.render();
  }

  public handle(events: IEvent[]) {
    for (const e of events) {
      switch (e.type) {
        case EVENT_TYPE.INFO:
          return this.messageHandler(e as InfoEvent);
        case EVENT_TYPE.ROUND_UPDATE:
          return this.roundHandler(e as RoundUpdateEvent);
      }
    }
  }
}
