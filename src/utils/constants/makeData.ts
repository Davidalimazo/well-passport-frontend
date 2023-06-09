export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  city: string;
  country: string;
};

export const data = [
  {
    id: 1,
    firstName: "Elenora",
    lastName: "Wilkinson",
    company: "Feest - Reilly",
    city: "Hertaland",
    country: "Qatar",
  },
  {
    id: 2,
    firstName: "Berneice",
    lastName: "Feil",
    company: "Deckow, Leuschke and Jaskolski",
    city: "Millcreek",
    country: "Nepal",
  },
] as Person[];
