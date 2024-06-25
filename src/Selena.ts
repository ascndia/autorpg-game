import {HeroInstanceInterface} from './GameInstanceInterface.js';
import Attributes from './Attributes.js';

export default class Selena implements HeroInstanceInterface {
  private attribute: Attributes
  constructor(){
    this.attribute = new Attributes({ health:1000 })
  }
  public update(){
    console.log('selena anjai');
    console.log('hp:',this.attribute.health)
  };
}