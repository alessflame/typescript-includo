import { IAzienda } from '../interfaces/IAzienda';
import { IPartecipante } from '../interfaces/IPartecipante';

export class Azienda implements IAzienda {
    nomeAzienda: string;
    settoreAttivita: string;
    descrizione: string;
    posizioniAperte: string[];

    constructor(
        nomeAzienda: string,
        settoreAttivita: string,
        descrizione: string,
        posizioniAperte: string[]
    ) {
        this.nomeAzienda = nomeAzienda;
        this.settoreAttivita = settoreAttivita;
        this.descrizione = descrizione;
        this.posizioniAperte = posizioniAperte;
    }

    offriPosizione(partecipante: IPartecipante, posizione: string): string {
        if (this.posizioniAperte.includes(posizione)) {
            return `Offerta di lavoro: ${posizione} offerta a ${partecipante.nome} ${partecipante.cognome}`;
        } else {
            return `Posizione ${posizione} non disponibile in ${this.nomeAzienda}`;
        }
    }
}