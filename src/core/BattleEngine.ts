import Base from '../hero/Base.js';
import Team from './Team.js';
import {
  BattleEngineStartEvent,
  CurrentHeroTurnEndedEvent,
  CurrentHeroTurnUpdateEvent,
  EVENT_TYPE,
  IEvent,
  RoundUpdateEvent,
  TargetHeroesSetEvent,
} from '../types-interface-states-enum/Event.js';
import { BattleEventHandler } from './handler/BattleEventHandler.js';
import GameEngine from './GameEngine.js';
import { ActionHandler } from './handler/ActionHandler.js';

export default class BattleEngine {
  constructor(GE: GameEngine) {
    this.GameEngine = GE;
    this.EventHandler = new BattleEventHandler(this);
    this.ActionHandler = new ActionHandler(this);
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
  private EventHandler: BattleEventHandler;
  private ActionHandler: ActionHandler;

  private Init() {
    this.assignTeamId();
    this.GameEngine.sendEvent([
      {
        type: EVENT_TYPE.BATTLE_ENGINE_START,
      } as BattleEngineStartEvent,
    ]);
  }

  public start() {
    this.Init();
    this.loopBattle();
  }

  public getEventHandler() {
    return this.EventHandler;
  }

  private async loopBattle() {
    let round = 1;
    while (!this.isBattleEnd()) {
      const initial = this.sortInitial();
      this.sendRound(round);
      while (initial.length !== 0) {
        const curr: Base = this.sortFastest(initial)[0];
        this.sendCurrentHeroTurn(curr);
        await delay(1000);
        await this.ActionHandler.handle(curr.update());
        this.sendCurrentHeroTurnEnded(curr);
        initial.shift();
        await delay(1000);
      }
      round++;
    }
  }
  public delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
  public sendCurrentHeroTurn(hero: Base) {
    const event: CurrentHeroTurnUpdateEvent = {
      type: EVENT_TYPE.CURR_HERO_TURN_UPDATE,
      text: `${hero.name} turn`,
      hero: hero,
    };
    this.GameEngine.sendEvent([event]);
  }

  public sendEvents(events: IEvent[]) {
    return this.GameEngine.sendEvent(events);
  }

  public sendTargetHeroes(heroes: Base[]) {
    const event: TargetHeroesSetEvent = {
      type: EVENT_TYPE.TARGET_HEROES_SET,
      target: heroes,
      text: `target : ${heroes.map((hero) => hero.name).join(' ')}`,
    };
    this.GameEngine.sendEvent([event]);
  }

  private sendCurrentHeroTurnEnded(hero: Base) {
    const event: CurrentHeroTurnEndedEvent = {
      type: EVENT_TYPE.CURR_HERO_TURN_ENDED,
      text: `${hero.name} turn ended`,
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
      ...this.team1.getHeroes(),
      ...this.team2.getHeroes(),
    ];
    return this.sortFastest(initial);
  }

  public getEnemyTeam(id: 1 | 2) {
    if (id === 1) {
      return this.team2;
    } else if (id === 2) {
      return this.team1;
    } else {
      throw new Error('no team id');
    }
  }

  public getTeam(id: 1 | 2) {
    if (id === 1) {
      return this.team1;
    } else {
      return this.team2;
    }
  }

  static resolveTarget(type: number, team: Team): Base[] {
    switch (type) {
      case 1:
        return team.getHeroes();

      default:
        return team.getHeroes();
    }
  }

  private sortFastest(heroes: Base[]): Base[] {
    // mock calculation
    return heroes.sort((a, b) => b.attribute.speed - a.attribute.speed);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
