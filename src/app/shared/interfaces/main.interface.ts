export interface Main {
  info: Info;
  results: Character[];
}

export interface Info {
  count: number;
  next: string;
  pages: 42;
  prev: null
}

export interface Character {
  id: number;
  name: string;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  location: Location;
  origin: Location;
  species: string;
  type: string;
  url: string;
}

export interface Location {
  url: string;
  name: string;
}