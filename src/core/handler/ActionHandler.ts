import { EventEmitter } from 'events';
import {
  ACTION_TYPE,
  AttackAction,
  IAction,
} from '../../types-interface-states-enum/Action.js';
import Resolver from '../TargetResolver.js';
import Team from '../Team.js';
import { delay } from '../../utils.js';
import { TICK } from '../../constant.js';

export class ActionHandler {
  constructor(team1: Team, team2: Team, Emitter: EventEmitter) {
    this.Resolver = new Resolver(team1, team2);
    this.Emitter = Emitter;
  }
  private Resolver: Resolver;
  private Emitter: EventEmitter;

  private async attackHandler({
    target,
    damage,
    caster,
  }: AttackAction): Promise<void> {
    this.Emitter.emit('battle:turn:calculating:target');
    const targets = this.Resolver.resolve(target);

    if (targets.length !== 0) {
      this.Emitter.emit('battle:turn:calculated:target', targets);
    }
    for (const target of targets) {
      this.Emitter.emit('info', `${caster.name} Attacking ${target.name}`);
      await delay(TICK);
    }
    for (const target of targets) {
      const payload = { damage };
      this.handle(target.take(payload));
    }
  }

  public handle(actions: IAction[]): void | Promise<void> {
    for (const action of actions) {
      switch (action.type) {
        case ACTION_TYPE.ATTACK:
          return this.attackHandler(action as AttackAction);
      }
    }
  }
}
