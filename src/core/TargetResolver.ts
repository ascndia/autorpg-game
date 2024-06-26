import Base from '../hero/Base.js';
import { ITarget } from '../types-interface-states-enum/AttackAction.js';
import { shuffleArray } from '../utils.js';
import BattleEngine from './BattleEngine.js';
import Team from './Team.js';

export default class TargetResolver {
  constructor(BE: BattleEngine) {
    this.BE = BE;
  }
  public Init() {
    this.team1 = this.BE.team1;
    this.team2 = this.BE.team2;
  }
  private BE: BattleEngine;
  private team1: Team;
  private team2: Team;

  private typeResolver(t: ITarget, heroes: Base[]) {
    let result: Base[] = [];
    switch (t.type) {
      case 'all':
        console.log('ALL');
        result = heroes;
        result = this.filters(result);
        break;
      case 'random':
        console.log('RANDOM');

        result = heroes;
        shuffleArray(result);
        break;
      case 'default':
        console.log('DEFAULT');

        result = this.sortResolver(t, heroes);
        result = this.filters(result);
    }
    if (result.length === 0 || TargetResolver.isUndefinedArray(result)) {
      result = heroes;
      result = this.filters(result);
    }
    return result;
  }

  static randomize(count: number = 0, heroes: Base[]) {
    shuffleArray(heroes);
    if (count <= 0 || count >= heroes.length) {
      return heroes;
    } else {
      for (let i = 0; i < count; i++) {
        heroes.pop();
      }
      return heroes;
    }
  }
  private filterEmpty(members: Base[]): Base[] {
    return members.filter((member) => {
      return member !== undefined;
    });
  }
  private filterDead(members: Base[]): Base[] {
    return members.filter((member) => {
      return member.getState().type !== 'DEAD';
    });
  }
  private filters(members: Base[]): Base[] {
    return this.filterDead(this.filterEmpty(members));
  }
  private positionResolver(t: ITarget): Base[] {
    let result: Base[];
    switch (t.position) {
      case 'back':
        result = this.getAllEnd(TargetResolver.resolveEnemyId(t.teamId));
        result = this.filters(result);
        break;
      case 'front':
        result = this.getAllEnd(TargetResolver.resolveEnemyId(t.teamId));
        result = this.filters(result);
        break;
      case 'mid':
        result = this.getAllEnd(TargetResolver.resolveEnemyId(t.teamId));
        result = this.filters(result);
        break;
      case 'all':
        result = this.getAllHeroes(TargetResolver.resolveEnemyId(t.teamId));
        result = this.filters(result);
        break;
    }
    if (result.length == 0 || TargetResolver.isUndefinedArray(result)) {
      result = this.getAllHeroes(TargetResolver.resolveEnemyId(t.teamId));
      result = this.filters(result);
    }
    return result;
  }

  private sortResolver(t: ITarget, heroes: Base[]): Base[] {
    if (!t.sortType) {
      return heroes;
    } else {
      let result: Base[] = [];
      const sortDir = t.sortType.sortDirection;
      switch (t.sortType.sortBy) {
        case 'attack':
          if (sortDir == 'ASC') {
            result = TargetResolver.sortByLowestAttack(heroes);
            result = this.filters(result);
            break;
          } else {
            result = TargetResolver.sortByHighestAttack(heroes);
            result = this.filters(result);
            break;
          }
        case 'health':
          if (sortDir == 'ASC') {
            result = TargetResolver.sortByLowestHealth(heroes);
            result = this.filters(result);
            break;
          } else {
            result = TargetResolver.sortByHighestHealth(heroes);
            result = this.filters(result);
            break;
          }
        case 'speed':
          if (sortDir == 'ASC') {
            result = TargetResolver.sortByLowestSpeed(heroes);
            result = this.filters(result);
            break;
          } else {
            result = TargetResolver.sortByHighestSpeed(heroes);
            result = this.filters(result);
            break;
          }
        case 'energy':
          if (sortDir == 'ASC') {
            result = TargetResolver.sortByLowestEnergy(heroes);
            result = this.filters(result);
            break;
          } else {
            result = TargetResolver.sortByHighestEnergy(heroes);
            result = this.filters(result);
            break;
          }
      }
      if (result.length == 0 || TargetResolver.isUndefinedArray(result)) {
        // TODO : ADD / UPDATE FALLBACK
        // THIS LIKELY PRONE TO BUG
        result = this.getAllHeroes(TargetResolver.resolveEnemyId(t.teamId));
        result = this.filters(result);
      }
      return result;
    }
  }
  private numberResolver(t: ITarget, heroes: Base[]): Base[] {
    if (t.number == 0 || t.type == 'all') {
      return heroes;
    } else {
      return heroes.slice(0, t.number);
    }
  }

  public resolve(t: ITarget): Base[] {
    let h: Base[] = [];
    h = this.positionResolver(t);

    h = this.typeResolver(t, h);

    h = this.numberResolver(t, h);

    return h;
  }

  static TeamsToHeroes(teams: Team[]): Base[] {
    let heroes: Base[] = [];
    teams.forEach((team) => {
      team.getAllHero().forEach((hero) => {
        heroes.push(hero);
      });
    });
    return heroes;
  }
  //   private resolveCategoryByTeam(category: 1 | 2): Team {
  //     if (category === 1) {
  //       return this.team1;
  //     } else {
  //       return this.team2;
  //     }
  //   }

  //   private resolveCategoryByHeroes(category: 1 | 2): Base[] {
  //     if (category === 1) {
  //       return TargetResolver.TeamsToHeroes([this.team1]);
  //     } else {
  //       return TargetResolver.TeamsToHeroes([this.team2]);
  //     }
  //   }

  public getAllHeroes(id: 1 | 2) {
    return this.BE.getTeam(id).getAllHero();
  }
  public getAllFront(id: 1 | 2) {
    return this.BE.getTeam(id).getHeroesByLayout('front');
  }
  public getAllMid(id: 1 | 2) {
    return this.BE.getTeam(id).getHeroesByLayout('mid');
  }
  public getAllEnd(id: 1 | 2) {
    return this.BE.getTeam(id).getHeroesByLayout('back');
  }

  static getAllFrontByTeam(team: Team): Base[] {
    return team.getHeroesByLayout('front');
  }
  static getAllMidByTeam(team: Team): Base[] {
    return team.getHeroesByLayout('mid');
  }
  static getAllBackByTeam(team: Team): Base[] {
    return team.getHeroesByLayout('back');
  }

  public sortInitial(): Base[] {
    return this.filters(
      TargetResolver.sortByHighestSpeed([
        ...this.team1.getAllHero(),
        ...this.team2.getAllHero(),
      ]),
    );
  }
  static sortByHighestSpeed(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => b.attribute.speed - a.attribute.speed);
  }
  static sortByLowestSpeed(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => a.attribute.speed - b.attribute.speed);
  }
  static sortByHighestAttack(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => b.attribute.attack - a.attribute.attack);
  }
  static sortByLowestAttack(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => a.attribute.attack - b.attribute.attack);
  }
  static sortByHighestHealth(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => b.attribute.health - a.attribute.health);
  }
  static sortByLowestHealth(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => a.attribute.health - b.attribute.health);
  }
  static sortByHighestEnergy(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => b.attribute.energy - a.attribute.energy);
  }
  static sortByLowestEnergy(heroes: Base[]): Base[] {
    return heroes.sort((a, b) => a.attribute.energy - b.attribute.energy);
  }

  static resolveEnemyId(id: 1 | 2) {
    if (id == 1) {
      return 2;
    } else {
      return 1;
    }
  }

  static isUndefinedArray<T>(array: (T | undefined)[]): boolean {
    return array.every((element) => element === undefined);
  }
}
