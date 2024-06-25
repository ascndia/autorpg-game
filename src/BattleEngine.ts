import GameInstanceInterface, { HeroInstanceInterface } from './GameInstanceInterface.js';

export default class BattleEngine implements GameInstanceInterface {
  
  constructor(
    team1 : HeroInstanceInterface[],
    team2 : HeroInstanceInterface[],
  ){
    this.team1 = team1;
    this.team2 = team2;
    this.assignTeamId(team1,1);
    this.assignTeamId(team2,2);
  }
  public team1 : HeroInstanceInterface[];
  public team2 : HeroInstanceInterface[];
  public combinedTeam : HeroInstanceInterface[];
  
  public update(){
    this.combinedTeam = this.calcInitialTurn();
    this.loopBattle();
  }
  
  private loopBattle(){
    while(this.combinedTeam.length > 0){
      // get the highest speed hero
      let curr = this.combinedTeam[0];
      // launch action
      curr.update();
      // mark hero already attacked
      this.combinedTeam.shift();
    }
  }
  
  private assignTeamId(
    team : HeroInstanceInterface[],
    id : 1 | 2
    ) : void {
    team.forEach((instance) => {
      instance.teamId = id
    })
  }
  
  private calcInitialTurn() : HeroInstanceInterface[] {
    // mock calculation
    const initial = [
      ...this.team1,
      ...this.team2
      ];
    return initial;
  }
}