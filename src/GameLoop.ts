import GameInstanceInterface,{
  HeroInstanceInterface
  } from './GameInstanceInterface.js';
import BattleEngine from './BattleEngine.js';

export default class GameLoop {
 // private Handler : (()=>any)[];
  private Subscriber: GameInstanceInterface[];
  public team1 : HeroInstanceInterface[];
  public team2 : HeroInstanceInterface[];
  private Engine : BattleEngine;
  private Rounds : any [];
  constructor(){
    this.Subscriber = [];
    this.Rounds = [];
  }
  
  public subscribe(instance : GameInstanceInterface){
    this.Subscriber.push(instance);
  }
  
  public start() : void {
    this.Init();
    this.Loop();
  }
  
  private Init(){
    this.Engine = new BattleEngine(
      this.team1,
      this.team2
    );
    this.subscribe(this.Engine)
  }
  
  private async Loop(){
    let i = 1
    while (true){
      //this.onRoundStart();
      this.onUpdate();
      //this.onRoundEnd();
      this.Rounds.push(1)
      await this.delay(2000)
      i++;
    }
  }
  
  private async delay(ms: number): Promise<void> {
   return new Promise(res => setTimeout(res, ms));
  }
  
  private onUpdate() : void {
    this.Subscriber.forEach(instance => {
      instance.update();
    })
  }

}

interface EventInterface {
  type: 'info','action',
  payload: any
}
