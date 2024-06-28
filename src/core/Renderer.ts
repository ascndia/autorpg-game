import Table from 'cli-table3';
import Team from './Team.js';
import chalk from 'chalk';
import UIState from './UIState.js';

export default class RenderGenerator {
  constructor(STATE: UIState) {
    this.STATE = STATE;
    this.STATE.register(() => this.render());
  }
  private STATE: UIState;
  public render() {
    console.clear();
    console.log(this.layout());
  }
  private layout() {
    const display = new Table();
    const info = new Table({ style: {}, head: ['no', 'info'] });
    this.STATE.MESSAGES.forEach((message, index) => {
      info.push([index + 1, message]);
    });

    display.push(
      [
        { colSpan: 12, content: `Round: ${this.STATE.ROUND}` },
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
  private drawHero(teamId: 1 | 2, order: number): string {
    let team: Team;
    if (teamId === 1) {
      team = this.STATE.TEAM1;
    } else {
      team = this.STATE.TEAM2;
    }
    const hero = team.getByIndex(order);
    if (hero === undefined) {
      return '-';
    }
    let text = hero.name;
    if (hero.getState().type == 'DEAD') {
      text = chalk.grey(text);
    }
    if (hero === this.STATE.CURR_HERO) {
      text = chalk.blue(text);
    }
    if (this.STATE.TARGETS.includes(hero)) {
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
        this.drawHero(1, 7),
        this.drawHero(1, 3),
        this.drawHero(1, 0),
        { colSpan: 6, content: '' },
        this.drawHero(2, 0),
        this.drawHero(2, 3),
        this.drawHero(2, 7),
      ],
      [
        this.drawHero(1, 8),
        this.drawHero(1, 4),
        this.drawHero(1, 1),
        { colSpan: 6, content: '' },
        this.drawHero(2, 1),
        this.drawHero(2, 4),
        this.drawHero(2, 8),
      ],
      [
        this.drawHero(1, 9),
        this.drawHero(1, 5),
        this.drawHero(1, 2),
        { colSpan: 6, content: '' },
        this.drawHero(2, 2),
        this.drawHero(2, 5),
        this.drawHero(2, 9),
      ],
      [
        '',
        this.drawHero(1, 6),
        '',
        { colSpan: 6, content: '' },
        '',
        this.drawHero(2, 6),
        '',
      ],
    ];
  }

  private drawHeroStats(teamId: 1 | 2, order: number) {
    let team: Team;
    if (teamId === 1) {
      team = this.STATE.TEAM1;
    } else {
      team = this.STATE.TEAM2;
    }
    const hero = team.getByIndex(order);
    if (hero == undefined) {
      return [{ colSpan: 5, content: '' }];
    } else {
      let resolveColor: (s: string) => string;
      if (hero === this.STATE.CURR_HERO) {
        resolveColor = chalk.blue;
      } else if (this.STATE.TARGETS.includes(hero)) {
        resolveColor = chalk.red;
      } else if (hero.getState().type == 'DEAD') {
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
