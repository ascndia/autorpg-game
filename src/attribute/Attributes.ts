export default class Attributes implements IAttribute {
  public health: number;
  public shield: number;
  public energy: number;
  public speed: number;
  public attack: number;

  constructor({
    health = 1000,
    attack = 200,
    shield = 0,
    energy = 50,
    speed = 300,
  }: AttributeBuilder) {
    this.health = health;
    this.shield = shield;
    this.energy = energy;
    this.speed = speed;
    this.attack = attack;
  }
}

export interface IAttribute {
  health: number;
  shield: number;
  energy: number;
  speed: number;
  attack: number;
}

export interface AttributeBuilder {
  health: number;
  shield?: number;
  energy?: number;
  speed?: number;
  attack?: number;
}
