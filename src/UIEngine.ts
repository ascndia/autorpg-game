export default class UIEngine {
  private team1: any[];
  private team2 : any[];
  private round : number;
  private information : string;
  
  public setTeam1(team : any[]){
    this.team1 = team;
  }
  
  public setTeam2(team : any[]){
    this.team2 = team;
  }
  
  public bind(GL : any){
    this.round = 
  }
  
  public update(){
    this.updateUI();
    
  }
  
  private updateUI(){
    console.log("=============")
    console.log(`Round : ${this.round}`)
    console.log("=============")
  }
}