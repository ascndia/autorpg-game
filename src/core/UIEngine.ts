import Base from '../hero/Base.js';
import GameEngine from './GameEngine.js';
import { UIEventHandler } from './handler/UIEventHandler.js';
import Table, { Cell } from 'cli-table3';
import chalk from 'chalk';

export default class UIEngine {
  constructor(GE: GameEngine) {
    this.GameEngine = GE;
    this.GameEngine;
    this.Handler = new UIEventHandler(this);
    this.INFO_MESSAGE = 'RURURU';
  }
  private INFO_MESSAGE: string;
  private CURRENT_HERO: Base;
  private TARGET_HEROES: Base[];
  private INFO_ROUND: number;
  private GameEngine: GameEngine;
  private Handler: UIEventHandler;

  public setCurrentHero(hero: Base) {
    this.CURRENT_HERO = hero;
  }
  public setTargetHeroes(heroes: Base[]) {
    this.TARGET_HEROES = heroes;
  }
  public setMessage(msg: string) {
    this.INFO_MESSAGE = msg;
  }
  public setRound(round: number) {
    this.INFO_ROUND = round;
  }

  public getHandler() {
    return this.Handler;
  }

  private layout() {
    const display = new Table();
    const info = new Table({ style: {}, head: ['no', 'info'] });
    info.push([1, this.INFO_MESSAGE]);
    display.push(
      [
        { colSpan: 12, content: `Round: ${this.INFO_ROUND}` },
        { colSpan: 6, content: info.toString(), rowSpan: 18 },
      ],
      ...this.drawPosition(),
      [{ colSpan: 12, content: '' }],
      [
        { colSpan: 5, content: 'Your Team' },
        { colSpan: 2, content: '', rowSpan: 12 },
        { colSpan: 5, content: 'Enemy Team' },
      ],
      ...this.drawStats(),
    );

    return display.toString();
  }

  public render() {
    return console.log(this.layout());
  }

  private drawHero(team: 1|2, order: number){
    const team = this.GameEngine.
    const hero = 
  }
  private drawPosition() {
    return [
      [
        'lele',
        'lele',
        'lele',
        { colSpan: 6, content: '' },
        'lele',
        'gester',
        'lele',
      ],
      [
        'lele',
        'lele',
        'lele',
        { colSpan: 6, content: '' },
        'lele',
        'gester',
        'lele',
      ],
      [
        'lele',
        'lele',
        'lele',
        { colSpan: 6, content: '' },
        'lele',
        'gester',
        'lele',
      ],
      ['', 'lele', '', { colSpan: 6, content: '' }, '', 'gester', ''],
    ];
  }

  private drawStats() {
    return [
      [
        'name',
        'health',
        'shield',
        'energy',
        'status',
        'name',
        'health',
        'shield',
        'energy',
        'status',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
      [
        'geester',
        '1000',
        '0',
        '50',
        'alive',
        'lelena',
        '2000',
        '0',
        '100',
        'alive',
      ],
    ];
  }
}
