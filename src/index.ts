import _ from "lodash";
import "./style.css";
import { defaultCompanies, defaultCourses, defaultStudents } from "./utils/data";
import { creaElementoStudente, creaElementoCorso, creaElementoAzienda } from "./utils/utils";

//** Funzioni per la creazione degli elementi **//


// Aggiungo i corsi al DOM
defaultCourses.forEach(course => {

    document
    .getElementById("corsiContainer")
    ?.appendChild(
        creaElementoCorso(
            course.titolo,
            course.descrizione,
            course.categoria,
            course.durata
        )
    );
    
});

//aggiungo le aziende al DOM
defaultCompanies.forEach(azienda => {
    document.getElementById("aziendeContainer")?.appendChild(
        creaElementoAzienda(
            azienda.nome,
            azienda.categoria,
            azienda.descrizione,
            azienda.ruoli
        )
    );
});

// Aggiungo gli studenti al DOM
defaultStudents.forEach(studente => {
    document.getElementById("studentiContainer")?.appendChild(
        creaElementoStudente(
            studente.nome,
            studente.cognome,
            studente.paese,
            studente.titolo,
            studente.lingue,
            studente.corso
        )
    );
});



//interattività ai pulsanti "Aggiungi" e apertura delle modali
document.getElementById("addCorsoBtn")?.addEventListener("click", () => {
    document.getElementById("corsoModal")!.style.display = "block";
});

document.getElementById("addAziendaBtn")?.addEventListener("click", () => {
    document.getElementById("aziendaModal")!.style.display = "block";
});

document.getElementById("addStudenteBtn")?.addEventListener("click", () => {
    document.getElementById("studenteModal")!.style.display = "block";
});


// Funzioni per chiudere le modali
document.getElementById("closeCorsoModal")?.addEventListener("click", () => {
    document.getElementById("corsoModal")!.style.display = "none";
});

document.getElementById("closeAziendaModal")?.addEventListener("click", () => {
    document.getElementById("aziendaModal")!.style.display = "none";
});

document.getElementById("closeStudenteModal")?.addEventListener("click", () => {
    document.getElementById("studenteModal")!.style.display = "none";
});

document.getElementById("closePosizioneModal")?.addEventListener("click", () => {
    document.getElementById("posizioneModal")!.style.display = "none";
});

document.getElementById("closeConfermaModal")?.addEventListener("click", () => {
    document.getElementById("confermaModal")!.style.display = "none";
});



// Gestione dei form di aggiunta
document.getElementById("corsoForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const titolo = (document.getElementById("corsoTitolo") as HTMLInputElement)
        .value;
    const descrizione = (
        document.getElementById("corsoDescrizione") as HTMLTextAreaElement
    ).value;
    const settore = (
        document.getElementById("corsoSettore") as HTMLInputElement
    ).value;
    const durata = parseInt(
        (document.getElementById("corsoDurata") as HTMLInputElement).value,
        10
    );

    if (
        !titolo ||
        !descrizione ||
        !settore ||
        !durata ||
        isNaN(durata) ||
        durata <= 0
    ) {
        alert("Per favore, compila tutti i campi correttamente.");
        return;
    }

    document
        .getElementById("corsiContainer")
        ?.appendChild(creaElementoCorso(titolo, descrizione, settore, durata));
    document.getElementById("corsoModal")!.style.display = "none";
    (document.getElementById("corsoForm") as HTMLFormElement).reset();
});



document.getElementById("aziendaForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = (document.getElementById("aziendaNome") as HTMLInputElement)
        .value;
    const settore = (
        document.getElementById("aziendaSettore") as HTMLInputElement
    ).value;
    const descrizione = (
        document.getElementById("aziendaDescrizione") as HTMLTextAreaElement
    ).value;
    const posizioni = (
        document.getElementById("aziendaPosizioni") as HTMLInputElement
    ).value
        .split(",")
        .map((pos) => pos.trim());

    if (!nome || !settore || !descrizione || !posizioni.length) {
        alert("Per favore, compila tutti i campi correttamente.");
        return;
    }

    document
        .getElementById("aziendeContainer")
        ?.appendChild(
            creaElementoAzienda(nome, settore, descrizione, posizioni)
        );
    document.getElementById("aziendaModal")!.style.display = "none";
    (document.getElementById("aziendaForm") as HTMLFormElement).reset();
});



document.getElementById("studenteForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = (document.getElementById("studenteNome") as HTMLInputElement)
        .value;
    const cognome = (
        document.getElementById("studenteCognome") as HTMLInputElement
    ).value;
    const paese = (document.getElementById("studentePaese") as HTMLInputElement)
        .value;
    const istruzione = (
        document.getElementById("studenteIstruzione") as HTMLInputElement
    ).value;
    const competenze = (
        document.getElementById("studenteCompetenze") as HTMLInputElement
    ).value
        .split(",")
        .map((comp) => comp.trim());
    const ambito = (
        document.getElementById("studenteAmbito") as HTMLInputElement
    ).value;

    if (
        !nome ||
        !cognome ||
        !paese ||
        !istruzione ||
        !competenze.length ||
        !ambito
    ) {
        alert("Per favore, compila tutti i campi correttamente.");
        return;
    }

    document
        .getElementById("studentiContainer")
        ?.appendChild(
            creaElementoStudente(
                nome,
                cognome,
                paese,
                istruzione,
                competenze,
                ambito
            )
        );
    document.getElementById("studenteModal")!.style.display = "none";
    (document.getElementById("studenteForm") as HTMLFormElement).reset();
});










