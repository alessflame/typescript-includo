import { IPartecipante } from './IPartecipante';

export interface ICorso {
    titolo: string;
    descrizione: string;
    settoreProfessionale: string;
    durata: number;
    elencoIscritti: IPartecipante[];
    aggiungiPartecipante(partecipante: IPartecipante): void;
}