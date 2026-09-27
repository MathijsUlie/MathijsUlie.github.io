const projecten = [
  {
    naam: 'Hotelsimulatie',
    categorie: 'games',
    beschrijving:
      'Een project waarin een hotelsituatie wordt nagebootst. Bezoekers, kamers en reserveringen worden in de simulatie verwerkt.',
    moeilijkheid: 8,
    jaar: 2026
  },
  {
    naam: 'Bodemvochtigheidssensor',
    categorie: 'iot',
    beschrijving:
      'Een sensorproject dat meet hoe nat de aarde is. Dit kan bijvoorbeeld worden gebruikt voor plantenverzorging of een slim irrigatiesysteem.',
    moeilijkheid: 6,
    jaar: 2025
  },
  {
    naam: 'Platformer game',
    categorie: 'games',
    beschrijving:
      'Een platformer game gemaakt met GDevelop, waar je levels moest halen door tegenstanders te verslaan en power-ups op te pakken.',
    moeilijkheid: 5,
    jaar: 2024
  },
  {
    naam: 'Pokemon database',
    categorie: 'website',
    beschrijving:
      'Een website gemaakt voor een Pokemon database waarbij HTML, CSS en PHP gebruikt zijn. Ook is er gebruik gemaakt van MySQL.',
    moeilijkheid: 7,
    jaar: 2024
  }
];

const projectLijst = document.getElementById('projectLijst');
const filterCategorie = document.getElementById('filterCategorie');
const sorteerOp = document.getElementById('sorteerOp');

function haalProjectenOp() {
  return [...projecten];
}

function filterProjecten(lijst, categorie) {
  if (categorie === 'all') {
    return lijst;
  }

  return lijst.filter(project => project.categorie === categorie);
}

function sorteerProjecten(lijst, sortering) {
  return lijst.sort((a, b) => {
    switch (sortering) {
      case 'moeilijkheid-desc':
        return b.moeilijkheid - a.moeilijkheid;
      case 'moeilijkheid-asc':
        return a.moeilijkheid - b.moeilijkheid;
      case 'naam-asc':
        return a.naam.localeCompare(b.naam);
      case 'naam-desc':
        return b.naam.localeCompare(a.naam);
      default:
        return 0;
    }
  });
}

function maakTag(tekst) {
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = tekst;
  return tag;
}

function maakProjectKaart(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const naam = document.createElement('h2');
  naam.textContent = project.naam;

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.appendChild(maakTag(project.categorie));
  meta.appendChild(maakTag('Jaar: ' + project.jaar));

  const beschrijving = document.createElement('p');
  beschrijving.textContent = project.beschrijving;

  const stats = document.createElement('div');
  stats.className = 'stats';
  stats.textContent = 'Moeilijkheid: ' + project.moeilijkheid;

  card.appendChild(naam);
  card.appendChild(meta);
  card.appendChild(beschrijving);
  card.appendChild(stats);

  return card;
}

function toonLegeMelding() {
  const leegBericht = document.createElement('div');
  leegBericht.className = 'empty-state';
  leegBericht.textContent = 'Geen projecten gevonden voor deze filter.';
  projectLijst.appendChild(leegBericht);
}

function maakProjectLijstLeeg() {
  projectLijst.innerHTML = '';
}

function renderProjecten() {
  let lijst = haalProjectenOp();
  lijst = filterProjecten(lijst, filterCategorie.value);
  lijst = sorteerProjecten(lijst, sorteerOp.value);

  maakProjectLijstLeeg();

  if (lijst.length === 0) {
    toonLegeMelding();
    return;
  }

  lijst.forEach(project => {
    const kaart = maakProjectKaart(project);
    projectLijst.appendChild(kaart);
  });
}

function initialiseerProjectenPagina() {
  filterCategorie.addEventListener('change', renderProjecten);
  sorteerOp.addEventListener('change', renderProjecten);
  renderProjecten();
}

initialiseerProjectenPagina();