import Base from '../hero/Base.js';
import Team from './Team.js';
import {
  CurrentHeroUpdateEvent,
  EVENT_TYPE,
  IEvent,
  RoundUpdateEvent,
} from '../types-interface-states-enum/Event.js';
import { BattleEventHandler } from './handler/BattleEventHandler.js';
import GameEngine from './GameEngine.js';

export default class BattleEngine {
  constructor(GE: GameEngine) {
    this.GameEngine = GE;
    this.Handler = new BattleEventHandler(this);
    this.GameEngine;
  }

  public getHero(teamId: 1 | 2, order: number) {
    if (teamId == 1) {
      return this.team1.getMembers()[order];
    } else {
      return this.team2.getMembers()[order];
    }
  }
  private GameEngine: GameEngine;
  public team1: Team;
  public team2: Team;
  private Handler: BattleEventHandler;

  private Init() {
    this.assignTeamId();
  }

  public start() {
    this.Init();
    this.loopBattle();
  }

  public getHandler() {
    return this.Handler;
  }

  private async loopBattle() {
    let round = 1;
    while (!this.isBattleEnd()) {
      const initial = this.sortInitial();
      this.sendRound(round);
      while (initial.length !== 0) {
        const curr: Base = this.sortFastest(initial)[0];
        this.sendCurrentHero(curr);
        const events: IEvent[] = curr.update();
        this.GameEngine.sendEvent(events);
        initial.shift();
        await delay(2000);
      }
      round++;
    }
  }
  private sendCurrentHero(hero: Base) {
    const event: CurrentHeroUpdateEvent = {
      type: EVENT_TYPE.CURR_HERO_UPDATE,
      text: `${hero.name} turn`,
      hero: hero,
    };
    this.GameEngine.sendEvent([event]);
  }
  private sendRound(round: number) {
    const event: RoundUpdateEvent = {
      type: EVENT_TYPE.ROUND_UPDATE,
      text: 'Round Changing',
      round: round,
    };
    this.GameEngine.sendEvent([event]);
  }

  private isBattleEnd() {
    if (this.team1.isLose()) {
      return true;
    } else if (this.team2.isLose()) {
      return true;
    } else {
      return false;
    }
  }

  private assignTeamId(): void {
    this.team1.assignTeam(1);
    this.team2.assignTeam(2);
  }

  private sortInitial(): Base[] {
    // mock calculation
    const initial: Base[] = [
      ...this.team1.getMembers(),
      ...this.team2.getMembers(),
    ];
    return this.sortFastest(initial);
  }

  public getEnemyTeam(id: 1 | 2) {
    if (id === 1) {
      return this.team2;
    } else if (id === 2) {
      return this.team2;
    } else {
      throw new Error('no team id');
    }
  }

  public resolveTarget(type: number, team: Team): Base[] {
    switch (type) {
      case 1:
        return team.getMembers();

      default:
        return team.getMembers();
    }
  }

  private sortFastest(heroes: Base[]): Base[] {
    // mock calculation
    return heroes;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
