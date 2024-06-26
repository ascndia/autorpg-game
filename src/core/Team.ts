import Base from '../hero/Base.js';

export default class Team {
  constructor() {
    this.members = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ];
    this.layout = {
      front: [0, 1, 2],
      mid: [3, 4, 5, 6],
      back: [7, 8, 9],
    };
    this.layout;
  }
  private members: [Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot];
  private layout: {
    front: [number, number, number];
    mid: [number, number, number, number];
    back: [number, number, number];
  };
  public addMember(member: Base, index?: number) {
    if (index) {
      this.members[index] = member;
    } else {
      this.members[this.getEmptySpot()] = member;
    }
  }

  public getEmptySpot(): number {
    let index: number = 0;
    for (const slot in this.members) {
      if (slot == undefined) {
        return index;
      } else {
        index++;
      }
    }
    return 0;
  }

  public assignTeam(id: 1 | 2) {
    this.members.forEach((hero) => {
      if (hero !== undefined) {
        hero.teamId = id;
      }
    });
  }

  public isLose(): boolean {
    const heroes = this.filterEmpty(this.members);
    for (const hero of heroes) {
      if (hero.getState().type !== 'DEAD') {
        return false;
      }
    }
    return true;
  }
  private filterEmpty(members: Base[]) {
    return members.filter((member) => {
      return member !== undefined;
    });
  }

  public getAllSlot(): Slot[] {
    return this.members;
  }

  public getAllHero() {
    return this.getAllSlot();
  }

  public getHeroesByLayout(layout: LAYOUT_TYPE): Base[] {
    return this.layout[layout].map((index) => this.members[index]);
  }

  public getHeroesByCombinedLayouts(layouts: LAYOUT_TYPE[]): Base[] {
    let combinedHeroes: Base[] = [];
    for (const layout of layouts) {
      combinedHeroes = combinedHeroes.concat(this.getHeroesByLayout(layout));
    }
    return combinedHeroes;
  }

  public getByIndex(index: number): Slot {
    return this.members[index];
  }
}

type Slot = undefined | Base;
type LAYOUT_TYPE = 'front' | 'mid' | 'back';
