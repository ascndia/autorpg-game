import { IEvent } from './Event.js';

export interface IHeroInstance {
  teamId: undefined | 1 | 2;
  name: string;
  update: () => IEvent[];
  attack: () => IEvent[];
  take: (any) => void;
}
