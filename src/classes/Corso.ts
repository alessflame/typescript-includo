import { ICorso } from '../interfaces/ICorso';
import { IPartecipante } from '../interfaces/IPartecipante';
import { Partecipante } from './Partecipante';

export class Corso implements ICorso {
    titolo: string;
    descrizione: string;
    settoreProfessionale: string;
    durata: number;
    elencoIscritti: Partecipante[];

    constructor(
        titolo: string,
        descrizione: string,
        settoreProfessionale: string,
        durata: number
    ) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.settoreProfessionale = settoreProfessionale;
        this.durata = durata;
        this.elencoIscritti = [];
    }

    aggiungiPartecipante(partecipante: Partecipante): void {
        if(this.elencoIscritti.find(e => e.nome == partecipante.nome && e.cognome == partecipante.cognome)){
            alert("Già inserito");
        }else{
            this.elencoIscritti.push(partecipante);
        }
    }
}