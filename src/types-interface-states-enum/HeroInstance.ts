import { IAction } from './Action.js';

export interface IHeroInstance {
  teamId: undefined | 1 | 2;
  name: string;
  update: () => IAction[];
  attack: () => IAction[];
  take: (any) => void;
}
