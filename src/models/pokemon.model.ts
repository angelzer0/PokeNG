export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
  };
}

export interface SpeciesDetails {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}
