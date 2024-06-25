import Base from '../hero/Base.js';

export interface IEventHandler {
  handle: (e: IEvent[]) => any;
  handleOnEach: () => any;
}

export interface IEvent {
  type: EVENT_TYPE;
}

export interface InfoEvent extends IEvent {
  text: string;
}

export interface RoundUpdateEvent extends InfoEvent {
  round: number;
}

export interface CurrentHeroUpdateEvent extends InfoEvent {
  hero: Base;
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
  CURR_HERO_UPDATE,
}
