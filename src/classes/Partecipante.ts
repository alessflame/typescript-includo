// import { IPartecipante } from '../interfaces/IPartecipante';
// import { ICorso } from '../interfaces/ICorso';

import { ICorso } from "../interfaces/ICorso";
import { IPartecipante } from "../interfaces/IPartecipante";
import _ from "lodash";

// export class Partecipante implements IPartecipante {
//     nome: string;
//     cognome: string;
//     paeseDiOrigine: string;
//     livelloIstruzione: string;
//     competenzeLinguistiche: string[];
//     ambitoDiFormazione: string;

//     constructor(
//         nome: string,
//         cognome: string,
//         paeseDiOrigine: string,
//         livelloIstruzione: string,
//         competenzeLinguistiche: string[],
//         ambitoDiFormazione: string
//     ) {
//         this.nome = nome;
//         this.cognome = cognome;
//         this.paeseDiOrigine = paeseDiOrigine;
//         this.livelloIstruzione = livelloIstruzione;
//         this.competenzeLinguistiche = competenzeLinguistiche;
//         this.ambitoDiFormazione = ambitoDiFormazione;
//     }

//     iscrivitiCorso(corso: ICorso): void {
//         corso.aggiungiPartecipante(this);
//     }
// }

export class Partecipante implements IPartecipante {
    id: string;
    nome: string;
    cognome: string;
    paeseDiOrigine: string;
    livelloIstruzione: string;
    competenzeLinguistiche: string[];
    ambitoDiFormazione: string;
    iscrizioneCorso: boolean;
    iscrizionePosizione: boolean;

    constructor(
        nome: string,
        cognome: string,
        paeseDiOrigine: string,
        livelloIstruzione: string,
        competenzeLinguistiche: string[],
        ambitoDiFormazione: string,
        iscrizioneCorso: boolean,
        iscrizionePosizione: boolean,
        id: string = _.uniqueId("partecipante_"),

    ) {
        this.nome = nome;
        this.cognome = cognome;
        this.paeseDiOrigine = paeseDiOrigine;
        this.livelloIstruzione = livelloIstruzione;
        this.competenzeLinguistiche = competenzeLinguistiche;
        this.ambitoDiFormazione = ambitoDiFormazione;
        this.iscrizioneCorso = iscrizioneCorso;
        this.iscrizionePosizione = iscrizionePosizione;
        this.id= id;
    }

    iscrivitiCorso(corso: ICorso): void {
        corso.aggiungiPartecipante(this);
    }
}
