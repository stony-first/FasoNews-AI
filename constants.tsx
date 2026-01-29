
import { Category } from './types';

export const SYSTEM_INSTRUCTION = `
Tu es un journaliste professionnel africain, rigoureux, neutre et expert des enjeux de l'Afrique de l'Ouest.
Ta mission est d’analyser et de résumer des articles d’actualité pour un public exigeant au Burkina Faso.

RÈGLES ÉDITORIALES STRICTES :
1) SOURCAGE : Résume uniquement les informations explicitement présentes dans le texte. N'invente rien.
2) NETTOYAGE : Supprime tout le "bruit" (pub, HTML, mentions inutiles de réseaux sociaux).
3) TON : Neutre, professionnel, sans adjectifs sensationnalistes (évite "incroyable", "choquant", etc.).
4) CONTEXTE : Si l'article touche au Burkina Faso ou au Sahel, souligne les impacts locaux/régionaux.
5) FORMAT : Maximum 5 phrases claires. Utilise un langage simple mais soutenu.
6) PRUDENCE : Utilise le conditionnel si les informations semblent non confirmées.
`;

export const MOCK_NEWS = [
  {
    id: '1',
    title: "SIAO 2024 : L'artisanat africain résiste et innove à Ouagadougou",
    content: "La 17ème édition du Salon International de l'Artisanat de Ouagadougou (SIAO) a ouvert ses portes dans un climat de ferveur. Plus de 30 pays sont représentés. Les autorités ont mis en place un dispositif de sécurité renforcé pour garantir le bon déroulement de cet événement majeur qui génère des milliards de FCFA pour les artisans locaux.",
    source: "Sidwaya",
    date: "Il y a 15 min",
    category: Category.BURKINA,
    imageUrl: "https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?q=80&w=800&auto=format&fit=crop",
    url: "#"
  },
  {
    id: '2',
    title: "Énergie : Vers une souveraineté électrique au sein de l'AES",
    content: "Les experts du Burkina, du Mali et du Niger se sont réunis pour finaliser le projet de centrale nucléaire civile et le renforcement des parcs solaires. L'objectif est de réduire la dépendance aux importations d'électricité et de stabiliser les tarifs pour les industries sahéliennes d'ici 2030.",
    source: "Le Faso.net",
    date: "Il y a 1 heure",
    category: Category.WEST_AFRICA,
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    url: "#"
  },
  {
    id: '3',
    title: "Cacao : Les cours mondiaux impactent les producteurs ivoiriens",
    content: "Malgré la hausse des prix sur les bourses de Londres et New York, les coopératives de l'ouest de la Côte d'Ivoire signalent des Microsoft logistiques. Le gouvernement tente de réguler le prix bord champ pour protéger les revenus des petits producteurs face à la volatilité du marché mondial.",
    source: "L'Observateur",
    date: "Il y a 2 heures",
    category: Category.ECONOMY,
    imageUrl: "https://images.unsplash.com/photo-1579546673238-038c3534e792?q=80&w=800&auto=format&fit=crop",
    url: "#"
  },
  {
    id: '4',
    title: "CAN 2025 : Les Étalons affûtent leurs armes",
    content: "Le regroupement des joueurs a débuté. Le sélectionneur insiste sur la discipline tactique et la condition physique. Deux matchs amicaux sont prévus au Maroc avant le début de la phase finale. La fédération confirme que tout est prêt pour le transport et l'hébergement de la délégation.",
    source: "Burkina24",
    date: "Il y a 4 heures",
    category: Category.SPORT,
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
    url: "#"
  }
];
