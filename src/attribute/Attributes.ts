export default class Attributes {
  public health : number;
  constructor(ab: AttributeBuilder){
    this.health = ab.health
  }
}

export interface AttributeBuilder {
  health: number,
}