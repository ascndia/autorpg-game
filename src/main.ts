import Selena from './hero/Selena.js';
import Geester from './hero/Geester.js';
import GameEngine from './core/GameEngine.js';
import Team from './core/Team.js';
import Minamoto from './hero/Minamoto.js';

const GL = new GameEngine();

const selen = new Selena();
const gester = new Geester();
const mina = new Minamoto();
const gester2 = new Geester();

const team1 = new Team();
const team2 = new Team();
team1.addMembers([selen, gester]);
team2.addMembers([mina, gester2]);
GL.assignTeam(team1, team2);
GL.start();
