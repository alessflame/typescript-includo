import { IPartecipante } from './IPartecipante';

export interface IAzienda {
    nomeAzienda: string;
    settoreAttivita: string;
    descrizione: string;
    posizioniAperte: string[];
    offriPosizione(partecipante: IPartecipante, posizione: string): void;
}