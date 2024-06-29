import _ from "lodash";
import { Partecipante } from "../classes/Partecipante";
import { Corso } from "../classes/Corso";
import { Azienda } from "../classes/Azienda";

//** Funzioni per la creazione degli elementi **//

// Corsi
export function creaElementoCorso(
    titolo: string,
    descrizione: string,
    settore: string,
    durata: number
) {
    const corso = new Corso(titolo, descrizione, settore, durata);

    const corsoDiv = document.createElement("div");
    corsoDiv.classList.add("card", "card-course");
    corsoDiv.innerHTML = `
        <div class="icon"><i class="fa fa-book"></i></div>
        <h3>${corso.titolo}</h3>
        <p>${corso.descrizione}</p>
        <p><strong>Settore:</strong> ${corso.settoreProfessionale}</p>
        <p><strong>Durata:</strong> ${corso.durata} ore</p>
        <p><strong>Partecipanti:</strong></p>
        <p><ul class="partecipanti-lista"></ul></p>`;

    corsoDiv.addEventListener("dragover", dragOver);
    corsoDiv.addEventListener("drop", (e)=>dropInCourse(e, corso, corsoDiv));
    return corsoDiv;
}

// Aziende
export function creaElementoAzienda(
    nome: string,
    settore: string,
    descrizione: string,
    posizioni: string[],
) {
    const azienda = new Azienda(nome, settore, descrizione, posizioni);

    const aziendaDiv = document.createElement("div");
    aziendaDiv.classList.add("card", "card-company");
    aziendaDiv.innerHTML = `
        <div class="icon"><i class="fa fa-building"></i></div>
        <h3>${azienda.nomeAzienda}</h3>
        <p>${azienda.descrizione}</p>
        <p><strong>Settore:</strong> ${azienda.settoreAttivita}</p>
        <p><strong>Posizioni aperte:</strong> ${azienda.posizioniAperte.join(
            ", "
        )}</p>
    `;

    aziendaDiv.addEventListener("dragover", dragOver);
    aziendaDiv.addEventListener("drop",(e)=>{dropInCompany(e,azienda)});
    return aziendaDiv;
}

// Studenti
export function creaElementoStudente(
    nome: string,
    cognome: string,
    paese: string,
    istruzione: string,
    competenze: string[],
    ambito: string
) {
    const studente = new Partecipante(
        nome,
        cognome,
        paese,
        istruzione,
        competenze,
        ambito,
        false,
        false
    );

    const studenteDiv = document.createElement("div");
    studenteDiv.classList.add("card", "card-user", "draggable");
    studenteDiv.setAttribute("draggable", "true");
    studenteDiv.setAttribute("id", `${nome}-${cognome}`);
    studenteDiv.innerHTML = `
        <div class="icon"><i class="fas fa-user-graduate"></i></div>
        <h3>${studente.nome} ${studente.cognome}</h3>
        <p>Paese di origine: ${studente.paeseDiOrigine}</p>
        <p>Livello di istruzione: ${studente.livelloIstruzione}</p>
        <p>Competenze linguistiche: ${studente.competenzeLinguistiche.join(
            ", "
        )}</p>
        <p>Ambito di formazione: ${studente.ambitoDiFormazione}</p>
    `;

    studenteDiv.addEventListener("dragstart", function (e) {
        dragStart(e, studente);
    });
    studenteDiv.addEventListener("dragend", dragEnd);
    return studenteDiv;
}

/** DRAG AND DROP **/

let scrollInterval: number | null = null;

function dragStart(event, studente: Partecipante) {
    console.log(studente);

    let partecipante = JSON.stringify(studente);
    const target = event.target as HTMLElement;
    event.dataTransfer?.setData("studente", partecipante);
    event.dataTransfer?.setDragImage(target, 0, 0);

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    // requestAnimationFrame(() => {
    //     document.body.style.overflow = 'hidden';
    // });
}

function dragEnd() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }

    document.body.style.overflow = "auto";
    document.removeEventListener("dragover", handleDragOver);
    document.removeEventListener("drop", handleDrop);
}

function dragOver(event: DragEvent) {
    event.preventDefault();
}

function dropInCompany(event, azienda: Azienda) {
    event.preventDefault();
    let studenteData = event.dataTransfer?.getData("studente") as string;
    let selectedStudente = JSON.parse(studenteData);

    let selectedAzienda = azienda;
    const posizioneSelect = document.getElementById("posizioneSelezionata") as HTMLSelectElement;
    posizioneSelect.innerHTML = "";

    azienda.posizioniAperte.forEach(posizione => {
        const option = document.createElement("option");
        option.value = posizione;
        option.textContent = posizione;
        posizioneSelect.appendChild(option);
    });


    const posizioneModal = document.getElementById("posizioneModal") as HTMLElement;
    posizioneModal.style.display = "block";


    document.getElementById("posizioneForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const posizioneSelect = document.getElementById("posizioneSelezionata") as HTMLSelectElement;
        const posizioneSelezionata = posizioneSelect.value;
    
        if (selectedAzienda && selectedStudente) {
            const messaggio = selectedAzienda.offriPosizione(selectedStudente, posizioneSelezionata);
            
            const confermaModal = document.getElementById("confermaModal") as HTMLElement;
            const confermaMessaggio = document.getElementById("confermaMessaggio") as HTMLElement;
            confermaMessaggio.textContent = messaggio;
            confermaModal.style.display = "block";
    
            const posizioneModal = document.getElementById("posizioneModal") as HTMLElement;
            posizioneModal.style.display = "none";
        }
    });
    
}


function dropInCourse(event, corso, htmlParent) {
    event.preventDefault();
    let studenteData = event.dataTransfer?.getData("studente") as string;
    let selectedStudente = JSON.parse(studenteData);

    corso.aggiungiPartecipante(selectedStudente);

    const partecipantiLista = corso.elencoIscritti.map((item) => `<li>${item.nome} ${item.cognome}</li>`).join("");
    const partecipantiElement = htmlParent.querySelector(".partecipanti-lista");
    partecipantiElement.innerHTML = partecipantiLista;
}



function handleDragOver(event: DragEvent) {
    const y = event.clientY;
    const threshold = 50;
    const speed = 10;

    if (y < threshold) {
        if (!scrollInterval) {
            scrollInterval = window.setInterval(() => {
                window.scrollBy(0, -speed);
            }, 16);
        }
    } else if (y > window.innerHeight - threshold) {
        if (!scrollInterval) {
            scrollInterval = window.setInterval(() => {
                window.scrollBy(0, speed);
            }, 16);
        }
    } else {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }
}

function handleDrop(event: DragEvent) {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}
