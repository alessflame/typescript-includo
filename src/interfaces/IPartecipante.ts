
import { ICorso } from './ICorso';

export interface IPartecipante{

    id: string,
    nome: string;
    cognome:string;
    paeseDiOrigine:string;
    livelloIstruzione:string;
    competenzeLinguistiche:string[];
    ambitoDiFormazione:string;
    iscrizioneCorso: boolean;
    iscrizionePosizione: boolean;
    iscrivitiCorso(corso: ICorso):void;

}