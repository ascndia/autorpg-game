import Base from '../hero/Base.js';
import { ITarget } from './AttackAction.js';
import { IEvent } from './Event.js';

export interface IAction {
  type: ACTION_TYPE;
  text?: string;
  events?: IEvent[];
}

export interface ITargetAction extends IAction {
  target: ITarget;
}
export interface AttackAction extends ITargetAction {
  damage: number;
  caster: Base;
}

export enum ACTION_TYPE {
  ATTACK,
  BUFF,
}
