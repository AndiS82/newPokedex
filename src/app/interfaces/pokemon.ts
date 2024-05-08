export interface IPokemon {
  id: number;
  name: string;
  url: string;
}

export interface IResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IResult[];
}

export interface IResult {
  name: string;
  url: string;
}

export interface IType {
  pokemon: IResult;
}

export interface ITypesEN {
  type: string;
}

export interface ITypesDE {
  typ: string;
}

export interface IStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface IStatuswerte {
  kp: number;
  angriff: number;
  verteidigung: number;
  spezialAngriff: number;
  spezialVerteidigung: number;
  initiative: number;
}

export interface IPokemonDetails {
  id: number;
  nameEN: string;
  nameDE: string;
  url: string;
  types: ITypesEN[];
  typen: ITypesDE[];
  stats: IStats[];
  statuswerte: IStatuswerte[];
}
