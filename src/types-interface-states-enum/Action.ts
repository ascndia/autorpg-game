import Base from '../hero/Base.js';
import { IEvent } from './Event.js';

export interface IAction {
  type: ACTION_TYPE;
  text?: string;
  events?: IEvent[];
}

export interface AttackAction extends IAction {
  damage: number;
  caster: Base;
  targetType: number;
}

export enum ACTION_TYPE {
  ATTACK,
  BUFF,
}
