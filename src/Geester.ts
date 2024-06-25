import { HeroInstanceInterface} from './GameInstanceInterface.js';
import Attributes from './Attributes.js';

export default class Geester implements HeroInstanceInterface {
  private attribute: Attributes
  constructor(){
    this.attribute = new Attributes({ health:1000 })
  }
  
  public update(){
    console.log('geester anjai');
    console.log('hp:',this.attribute.health)
  };
}