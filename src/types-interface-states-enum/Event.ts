import Base from '../hero/Base.js';

export interface IEventHandler {
  handle: (e: IEvent[]) => any;
  handleOnEach: () => any;
}

export interface IEvent {
  type: EVENT_TYPE;
}

export interface BattleEngineStartEvent extends IEvent {}

export interface InfoEvent extends IEvent {
  text: string;
}

export interface RoundUpdateEvent extends InfoEvent {
  round: number;
}

export interface CurrentHeroTurnUpdateEvent extends InfoEvent {
  hero: Base;
}

export interface CurrentHeroTurnEndedEvent extends InfoEvent {}

export interface TargetHeroesSetEvent extends InfoEvent {
  target: Base[];
}

export interface AttackEvent extends IEvent {
  caster: Base;
  damage: number;
}

export interface SkillEvent extends IEvent {
  caster: Base;
  damage: number;
}

export enum EVENT_TYPE {
  ATTACK,
  SKILL,
  INFO,
  ROUND_UPDATE,
  CURR_HERO_TURN_UPDATE,
  CURR_HERO_TURN_ENDED,
  TARGET_HEROES_SET,
  BATTLE_ENGINE_START,
}
