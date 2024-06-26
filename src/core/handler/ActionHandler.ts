import {
  ACTION_TYPE,
  AttackAction,
  IAction,
} from '../../types-interface-states-enum/Action.js';
import {
  EVENT_TYPE,
  InfoEvent,
  TargetHeroesSetEvent,
} from '../../types-interface-states-enum/Event.js';
import BattleEngine from '../BattleEngine.js';

export class ActionHandler {
  constructor(BE: BattleEngine) {
    this.BE = BE;
  }
  private BE: BattleEngine;

  private async attackHandler({
    targetType,
    caster,
    damage,
    text,
  }: AttackAction): Promise<void> {
    const enemyTeam = this.BE.getEnemyTeam(caster.teamId);
    const targets = BattleEngine.resolveTarget(targetType, enemyTeam);
    if (targets) {
      this.BE.sendEvents([
        {
          type: EVENT_TYPE.TARGET_HEROES_SET,
          target: targets,
          text: `Targets: [${targets.map((target) => target.name).join(' ')}]`,
        } as TargetHeroesSetEvent,
      ]);
      await this.BE.delay(1000);
    }
    if (text) {
      this.BE.sendEvents([
        {
          type: EVENT_TYPE.INFO,
          text,
        } as InfoEvent,
      ]);
      await this.BE.delay(1000);
    }

    targets.forEach((hero) => {
      const payload = { damage };
      this.handle(hero.take(payload));
    });
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
