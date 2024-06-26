import Base from '../hero/Base.js';
import GameEngine from './GameEngine.js';
import { UIEventHandler } from './handler/UIEventHandler.js';
import Table from 'cli-table3';
import chalk from 'chalk';
import Team from './Team.js';

export default class UIEngine {
  constructor(GE: GameEngine) {
    this.GameEngine = GE;
    this.GameEngine;
    this.Handler = new UIEventHandler(this);
    this.TARGET_HEROES = [];
    this.INFO_MESSAGE = [];
  }

  private TEAM1: Team;
  private TEAM2: Team;
  private INFO_MESSAGE: string[];
  private CURRENT_HERO: Base;
  private TARGET_HEROES: Base[];
  private INFO_ROUND: number;
  private GameEngine: GameEngine;
  private Handler: UIEventHandler;

  public Init() {
    this.TEAM1 = this.GameEngine.getTeam(1);
    this.TEAM2 = this.GameEngine.getTeam(2);
  }

  public setCurrentHero(hero: Base) {
    this.CURRENT_HERO = hero;
  }
  public setTargetHeroes(heroes: Base[]) {
    this.TARGET_HEROES = heroes;
  }
  public addMessage(msg: string) {
    this.INFO_MESSAGE.push(msg);
  }
  public clear() {
    this.clearMessage();
    this.clearTargets();
  }
  public clearMessage() {
    this.INFO_MESSAGE = [];
  }
  public clearTargets() {
    this.TARGET_HEROES = [];
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

    this.INFO_MESSAGE.forEach((message, index) => {
      info.push([index + 1, message]);
    });

    display.push(
      [
        { colSpan: 12, content: `Round: ${this.INFO_ROUND}` },
        { colSpan: 6, content: info.toString(), rowSpan: 19 },
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

  private drawHero(teamId: 1 | 2, order: number): string {
    let team: Team;
    if (teamId === 1) {
      team = this.TEAM1;
    } else {
      team = this.TEAM2;
    }
    const hero = team.getByIndex(order);
    if (hero === undefined) {
      return '-';
    }
    let text = hero.name;
    if (hero.getState().type == 'DEAD') {
      text = chalk.grey(text);
    }
    if (hero === this.CURRENT_HERO) {
      text = chalk.blue(text);
    }
    if (this.TARGET_HEROES.includes(hero)) {
      text = chalk.red(text);
    }
    return text;
  }

  private drawPosition() {
    return [
      [
        'Back',
        'Mid',
        'Front',
        { colSpan: 6, content: '' },
        'Front',
        'Mid',
        'Back',
      ],
      [
        this.drawHero(1, 0),
        this.drawHero(1, 1),
        this.drawHero(1, 2),
        { colSpan: 6, content: '' },
        this.drawHero(2, 2),
        this.drawHero(2, 1),
        this.drawHero(2, 0),
      ],
      [
        this.drawHero(1, 3),
        this.drawHero(1, 4),
        this.drawHero(1, 5),
        { colSpan: 6, content: '' },
        this.drawHero(2, 5),
        this.drawHero(2, 4),
        this.drawHero(2, 3),
      ],
      [
        this.drawHero(1, 6),
        this.drawHero(1, 7),
        this.drawHero(1, 8),
        { colSpan: 6, content: '' },
        this.drawHero(2, 8),
        this.drawHero(2, 7),
        this.drawHero(2, 6),
      ],
      [
        '',
        this.drawHero(1, 9),
        '',
        { colSpan: 6, content: '' },
        '',
        this.drawHero(2, 9),
        '',
      ],
    ];
  }

  private drawHeroStats(teamId: 1 | 2, order: number) {
    let team: Team;
    if (teamId === 1) {
      team = this.TEAM1;
    } else {
      team = this.TEAM2;
    }
    const hero = team.getByIndex(order);
    if (hero == undefined) {
      return [{ colSpan: 5, content: '' }];
    } else {
      let resolveColor: (s: string) => string;
      if (hero === this.CURRENT_HERO) {
        resolveColor = chalk.blue;
      } else if (this.TARGET_HEROES.includes(hero)) {
        resolveColor = chalk.red;
      } else if (hero.attribute.health < 0) {
        resolveColor = chalk.gray;
      } else {
        resolveColor = chalk.white;
      }
      return [
        resolveColor(hero.name),
        resolveColor(hero.attribute.health.toString()),
        resolveColor(hero.attribute.shield.toString()),
        resolveColor(hero.attribute.energy.toString()),
        resolveColor(hero.attribute.speed.toString()),
      ];
    }
  }
  private drawStats() {
    return [
      [
        'name',
        'health',
        'shield',
        'energy',
        'speed',
        'name',
        'health',
        'shield',
        'energy',
        'speed',
      ],
      [...this.drawHeroStats(1, 0), ...this.drawHeroStats(2, 0)],
      [...this.drawHeroStats(1, 1), ...this.drawHeroStats(2, 1)],
      [...this.drawHeroStats(1, 2), ...this.drawHeroStats(2, 2)],
      [...this.drawHeroStats(1, 3), ...this.drawHeroStats(2, 3)],
      [...this.drawHeroStats(1, 4), ...this.drawHeroStats(2, 4)],
      [...this.drawHeroStats(1, 5), ...this.drawHeroStats(2, 5)],
      [...this.drawHeroStats(1, 6), ...this.drawHeroStats(2, 6)],
      [...this.drawHeroStats(1, 7), ...this.drawHeroStats(2, 7)],
      [...this.drawHeroStats(1, 8), ...this.drawHeroStats(2, 8)],
      [...this.drawHeroStats(1, 9), ...this.drawHeroStats(2, 9)],
    ];
  }
}
