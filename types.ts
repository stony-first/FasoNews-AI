
export enum Category {
  ALL = 'Toute l\'actu',
  BURKINA = 'Burkina Faso',
  WEST_AFRICA = 'Afrique de l\'Ouest',
  ECONOMY = 'Économie',
  SPORT = 'Sport'
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  category: Category;
  imageUrl: string;
  url: string;
}

export interface AISummary {
  text: string;
  timestamp: string;
}
