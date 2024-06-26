export interface ITarget {
  teamId: 1 | 2;
  subject: SUBJECT_TYPE;
  type: TARGET_TYPE;
  position: TARGET_POSITION_TYPE;
  number: TARGET_NUMBER;
  sortType?: {
    sortBy: TARGET_SORT_TYPE;
    sortDirection: 'ASC' | 'DESC';
  };
}

export type SUBJECT_TYPE = 'team' | 'enemy' | 'all';
export type TARGET_POSITION_TYPE = 'front' | 'mid' | 'back' | 'all';
export type TARGET_TYPE = 'random' | 'all' | 'default';
export type TARGET_NUMBER = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type TARGET_SORT_TYPE = 'health' | 'speed' | 'energy' | 'attack';
