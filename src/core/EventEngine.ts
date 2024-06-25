import { IEventHandler, IEvent } from '../types-interface-states-enum/Event.js';
import GameEngine from './GameEngine.js';

export default class EventEngine {
  constructor(GE: GameEngine) {
    this.GameEngine = GE;
    this.GameEngine;
    this.Handlers = [];
  }
  private GameEngine: GameEngine;
  private Handlers: IEventHandler[];

  public register(handler: IEventHandler) {
    this.Handlers.push(handler);
  }

  public sendEvent(events: IEvent[]) {
    this.Handlers.forEach((handler) => {
      handler.handleOnEach();
      handler.handle(events);
    });
  }
}
