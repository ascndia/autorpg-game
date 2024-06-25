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
  public addMembers(members: Base[]) {
    members.forEach((member) => {
      this.members.push(member);
    });
  }
  public addMember(member: Base, index?: number) {
    if (index) {
      this.members[index] = member;
    } else {
    }
  }
  public assignTeam(id: 1 | 2) {
    this.members.forEach((hero) => {
      hero.teamId = id;
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
  public getMembers() {
    return this.members;
  }
}

type Slot = Base | undefined;
