import GameLoop from './GameLoop.js';
import Selena from './Selena.js';
import Geester from './Geester.js';

const GL = new GameLoop();

const selen = new Selena();
const gester = new Geester();

GL.team1 = [selen];
GL.team2 = [gester];
GL.start();