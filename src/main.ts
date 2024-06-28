import Selena from './hero/Selena.js';
import Geester from './hero/Geester.js';
import GameEngine from './core/GameEngine.js';
import Team from './core/Team.js';
import Alpha from './hero/Alpha.js';
import Nana from './hero/Nana.js';
import Belerick from './hero/Belerick.js';
import Lancelot from './hero/Lancelot.js';
import Alice from './hero/Alice.js';
import Moskov from './hero/Moskov.js';
import Lunox from './hero/Lunox.js';

const GL = new GameEngine();

const team1 = new Team();
const team2 = new Team();
team1.addMember(new Selena(), 4);
team1.addMember(new Nana(), 3);
team1.addMember(new Belerick(), 1);
team1.addMember(new Lancelot(), 5);
team1.addMember(new Selena(), 7);
team1.addMember(new Moskov(), 9);

team2.addMember(new Moskov(), 9);
team2.addMember(new Lunox(), 4);
team2.addMember(new Alice(), 1);
team2.addMember(new Nana(), 3);
team2.addMember(new Geester(), 5);
team2.addMember(new Alpha(), 7);

GL.assignTeam(team1, team2);
GL.start();
