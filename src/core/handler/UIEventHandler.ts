import {
  BattleEngineStartEvent,
  CurrentHeroTurnEndedEvent,
  CurrentHeroTurnUpdateEvent,
  EVENT_TYPE,
  IEvent,
  IEventHandler,
  InfoEvent,
  RoundUpdateEvent,
  TargetHeroesSetEvent,
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
    this.Engine.addMessage(e.text);
    this.render();
  }

  private battleEngineStartHandler(e: BattleEngineStartEvent) {
    e;
    this.Engine.Init();
  }
  private roundHandler(e: RoundUpdateEvent) {
    this.Engine.setRound(e.round);
    this.render();
  }
  private currentHeroTurnUpdateHandler(e: CurrentHeroTurnUpdateEvent) {
    this.Engine.setCurrentHero(e.hero);
    this.Engine.clear();
    this.Engine.addMessage(e.text);
    this.render();
  }
  private currentHeroTurnEndedHandler(e: CurrentHeroTurnEndedEvent) {
    this.Engine.addMessage(e.text);
    this.Engine.clearTargets();
    this.render();
  }

  private targetHeroesSetHandler(e: TargetHeroesSetEvent) {
    this.Engine.setTargetHeroes(e.target);
    this.Engine.addMessage(e.text);
    this.render();
  }
  public handle(events: IEvent[]) {
    for (const e of events) {
      switch (e.type) {
        case EVENT_TYPE.CURR_HERO_TURN_UPDATE:
          return this.currentHeroTurnUpdateHandler(
            e as CurrentHeroTurnUpdateEvent,
          );
        case EVENT_TYPE.CURR_HERO_TURN_ENDED:
          return this.currentHeroTurnEndedHandler(
            e as CurrentHeroTurnUpdateEvent,
          );
        case EVENT_TYPE.TARGET_HEROES_SET:
          return this.targetHeroesSetHandler(e as TargetHeroesSetEvent);
        case EVENT_TYPE.BATTLE_ENGINE_START:
          return this.battleEngineStartHandler(e as BattleEngineStartEvent);
        case EVENT_TYPE.INFO:
          return this.messageHandler(e as InfoEvent);
        case EVENT_TYPE.ROUND_UPDATE:
          return this.roundHandler(e as RoundUpdateEvent);
      }
    }
  }
}
