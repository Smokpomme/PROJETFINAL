// crafts.d.ts
export interface Element {
  description: string;
  image: string;
}

export interface Categories {
  [key: string]: Element;
}

export interface Donnees {
  blocs?: Categories;
  utilitaires?: Categories;
  nourriture?: Categories;
  [key: string]: Categories | undefined;
}