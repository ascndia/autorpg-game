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
  }
  private members: [Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot];

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
    for (const hero of this.members) {
      if (hero.getState().type !== 'DEAD') {
        return false;
      }
    }
    return true;
  }
  public getMembers(): Slot[] {
    return this.members;
  }

  public getHeroes() {
    return this.filterEmpty(this.getMembers());
  }

  public filterEmpty(members: Base[]) {
    return members.filter((member) => {
      return member !== undefined;
    });
  }

  public getIndex(index: number) {
    if (this.members[index] == undefined) {
      return undefined;
    }
    return this.members[index];
  }
}

type Slot = undefined | Base;
