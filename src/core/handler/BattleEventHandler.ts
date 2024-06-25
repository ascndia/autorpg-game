import {
  AttackEvent,
  SkillEvent,
  EVENT_TYPE,
  IEvent,
  IEventHandler,
} from '../../types-interface-states-enum/Event.js';
import BattleEngine from '../BattleEngine.js';

export class BattleEventHandler implements IEventHandler {
  constructor(BE: BattleEngine) {
    this.BE = BE;
  }
  private BE: BattleEngine;

  private attackHandler(e: AttackEvent) {
    const caster = e.caster;
    const enemyTeam = this.BE.getEnemyTeam(caster.teamId);
    const targets = this.BE.resolveTarget(1, enemyTeam);
    targets.forEach((hero) => {
      const payload = { damage: e.damage };
      hero.take(payload);
    });
  }

  private skillHandler(e: SkillEvent) {
    const caster = e.caster;
    const enemyTeam = this.BE.getEnemyTeam(caster.teamId);
    const targets = this.BE.resolveTarget(1, enemyTeam);
    targets.forEach((hero) => {
      const payload = { damage: e.damage };
      hero.take(payload);
    });
  }

  public handleOnEach() {}

  public handle(events: IEvent[]) {
    for (const e of events) {
      switch (e.type) {
        case EVENT_TYPE.ATTACK:
          return this.attackHandler(e as AttackEvent);
        case EVENT_TYPE.SKILL:
          return this.skillHandler(e as SkillEvent);
      }
    }
  }
}
