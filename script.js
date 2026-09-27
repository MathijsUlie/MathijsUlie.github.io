const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const resultaat = document.querySelector('#resultaat');

const velden = [
  { id: 'naam', boodschap: 'Vul minimaal 2 tekens in.' },
  { id: 'email', boodschap: 'Vul een geldig e-mailadres in.' },
  { id: 'bericht', boodschap: 'Schrijf minimaal 10 tekens.' }
];

function haalInputOp(id) {
  return document.querySelector(`#${id}`);
}

function haalFoutmeldingOp(id) {
  return document.querySelector(`#${id}-error`);
}

function valideerVeld(veld) {
  const input = haalInputOp(veld.id);
  const foutmelding = haalFoutmeldingOp(veld.id);
  const geldig = input.checkValidity();

  input.setAttribute('aria-invalid', String(!geldig));
  foutmelding.textContent = geldig ? '' : veld.boodschap;

  return geldig;
}

function valideerFormulier() {
  return velden.map(valideerVeld).every(Boolean);
}

function haalFormulierGegevensOp() {
  return {
    naam: haalInputOp('naam').value,
    email: haalInputOp('email').value,
    bericht: haalInputOp('bericht').value
  };
}

function toonFoutStatus() {
  status.textContent = 'Er zijn nog fouten in het formulier.';
  resultaat.innerHTML = '';
}

function toonSuccesStatus() {
  status.textContent = 'Bericht verzonden! Bedankt.';
}

function toonVerzondenGegevens(gegevens) {
  resultaat.innerHTML = `
    <h3>Verzonden gegevens</h3>
    <p><strong>Naam:</strong> ${gegevens.naam}</p>
    <p><strong>E-mail:</strong> ${gegevens.email}</p>
    <p><strong>Bericht:</strong> ${gegevens.bericht}</p>
  `;
}

function resetFormulier() {
  form.reset();
}

function verwerkSubmit(event) {
  event.preventDefault();

  const alleGeldig = valideerFormulier();

  if (!alleGeldig) {
    toonFoutStatus();
    return;
  }

  const gegevens = haalFormulierGegevensOp();
  toonSuccesStatus();
  toonVerzondenGegevens(gegevens);
  resetFormulier();
}

form.addEventListener('submit', verwerkSubmit);