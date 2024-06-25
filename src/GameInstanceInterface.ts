export default interface GameInstanceInterface {
  update : () => any;
  onInit? : () => any;
  onUpdate? : () => any;
  onDestroy? : () => any;
}

export interface HeroInstanceInterface extends GameInstanceInterface {
  teamId? : 1 | 2
}
