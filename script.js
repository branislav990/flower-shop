// DOM
const form = document.querySelector('.row');
const inpRuza = document.getElementById('ruza');
const inpLjiljan = document.getElementById('ljiljan');
const inpGerber = document.getElementById('gerber');

const checkDodatak = document.getElementsByName('dodatak');

const divPorudzbina = document.getElementById('porudzbina');

const btnIzracunaj = document.getElementById('izracunaj');
const btnResetuj = document.getElementById('resetuj');
// const btnOK = document.getElementById('btn-ok');
const pozadina = document.getElementById('pozadina');

let poruka;

// Button za računanje cene
btnIzracunaj.addEventListener('click', () => {

    // Izbriši stari div koji sadrži cenu sa stranice
    const postojeciDiv = document.getElementById('result');

    if (postojeciDiv) {
        divPorudzbina.removeChild(postojeciDiv);
    }

    // Kreiraj div koji će sadržati novu cenu
    const divResult = document.createElement('div');
    divResult.id = 'result';


    const ruzaValue = inpRuza.value;
    const ljiljanValue = inpLjiljan.value;
    const gerberValue = inpGerber.value;

    // Proveri da li su uneti celi pozitivni brojevi za cene
    const negRuze = Math.floor(ruzaValue) != ruzaValue || ruzaValue < 0;
    const negLjiljani = Math.floor(ljiljanValue) != ljiljanValue || ljiljanValue < 0;
    const negGerberi = Math.floor(gerberValue) != gerberValue || gerberValue < 0;

    if (negRuze) { 
        inpRuza.style.backgroundColor = '#EFAFB2';
    }

    if (negLjiljani) { 
        inpLjiljan.style.backgroundColor = '#EFAFB2';
    }

    if (negGerberi) { 
        inpGerber.style.backgroundColor = '#EFAFB2';
    }

    if (negRuze || negLjiljani || negGerberi) {
        Swal.fire('Dozvoljen je unos samo pozitivnih celih brojeva');
    }

    
    // Iniciraj sumu
    let cenaUkupno = 0;

    // Nastavi ukoliko su sve vrednosti ispravne
    if (!(negRuze || negLjiljani || negGerberi)) {

        // Izračunaj cenu ruža i ubaci slike u paragraf
        cenaUkupno += ruzaValue * 150;
        const pRuza = document.createElement('p');

        for (let i = 0; i < ruzaValue; i++) {
            const image = document.createElement('img');
            image.src = 'styles/images/ruza.png';
            image.alt = 'Ruža';
            pRuza.appendChild(image);
            divResult.appendChild(pRuza);
        }

        // Izračunaj cenu ljiljana i ubaci slike u paragraf
        cenaUkupno += ljiljanValue * 120;
        const pLjiljan = document.createElement('p');

        for (let i = 0; i < ljiljanValue; i++) {
            const image = document.createElement('img');
            image.src = 'styles/images/ljiljan.png';
            image.alt = 'alt', 'Ljiljan';
            pLjiljan.appendChild(image);
            divResult.appendChild(pLjiljan);
        }

        // Izračunaj cenu gerbera i ubaci slike u paragraf
        cenaUkupno += gerberValue * 70;
        const pGerber = document.createElement('p');

        for (let i = 0; i < gerberValue; i++) {
            const image = document.createElement('img');
            image.src = 'styles/images/gerber.png';
            image.alt = 'Gerber';
            pGerber.appendChild(image);
            divResult.appendChild(pGerber);
        }
    }


    // Dodaj cene izabranih dodataka na sumu ukoliko je već odabran neki cvet
    if (cenaUkupno > 0) {
        checkDodatak.forEach(box => {
            if (box.checked) {
                cenaUkupno += 500;

                const pDodatak = document.createElement('p');
                pDodatak.textContent = `+ ${box.value}`;

                divResult.appendChild(pDodatak);
            }
        });
    }
    
    // Implementiraj iznos cene u zavisnosti od izabranog načina plaćanja
    const radioPlacanje = document.querySelector('input[name="placanje"]:checked');
    
    if (radioPlacanje.value == 'card' && cenaUkupno > 2000) {
        const h3Cena = document.createElement('h3');
        h3Cena.textContent = `Cena bez popusta je: ${cenaUkupno} din.`;

        const h2Popust = document.createElement('h2');
        h2Popust.classList.add('cena-ukupno');
        // h2Popust.style.boxShadow = '0 0 15px #923236';
        h2Popust.innerHTML = `Cena sa popustom je: <strong>${cenaUkupno * 0.9} din.</strong>`;

        divResult.append(h3Cena, h2Popust);
    }
    else {
        const h2Cena = document.createElement('h2');
        h2Cena.classList.add('cena-ukupno');
        h2Cena.innerHTML = `Cena: <strong>${cenaUkupno} din.</strong>`;

        divResult.appendChild(h2Cena);
    }

    // Ukoliko je pozitivna vrednost cene, prikaži rezultat i prilagodi stranicu
    if (cenaUkupno > 0) {
        // const pozadina = document.getElementById('pozadina');
        pozadina.style.opacity = 0.15;

        const h1Naslov = document.getElementById('porNaslov');
        h1Naslov.style.display = 'block';
        void h1Naslov.offsetWidth;
        h1Naslov.classList.add('visible');

        const btns = document.getElementsByClassName('btns');
        btns[0].classList.add('btns-result');

        btnIzracunaj.classList.add('izracunaj-resetuj-result');
        btnResetuj.classList.add('izracunaj-resetuj-result');

        divPorudzbina.appendChild(divResult);    
        
        void divResult.offsetWidth;
        divResult.classList.add('visible');
    }
});


// Kada resetuješ formu, izbriši staru cenu i vrati stranicu na početno stanje
btnResetuj.addEventListener('click', () => {
    // const pozadina = document.getElementById('pozadina');
    if (window.innerWidth > 650) pozadina.style.opacity = 1;

    const h1Naslov = document.getElementById('porNaslov');
    h1Naslov.classList.remove('visible');
    setTimeout(() => h1Naslov.style.display = 'none', 1000);

    const btns = document.getElementsByClassName('btns');
    btns[0].classList.remove('btns-result');

    btnIzracunaj.classList.remove('izracunaj-resetuj-result');
    btnResetuj.classList.remove('izracunaj-resetuj-result');

    inpRuza.style.backgroundColor = '#FDF6F7';
    inpLjiljan.style.backgroundColor = '#FDF6F7';
    inpGerber.style.backgroundColor = '#FDF6F7';

    const postojeciDiv = document.getElementById('result');

    if (postojeciDiv && postojeciDiv.classList.contains('visible')) {
        postojeciDiv.classList.remove('visible');

        postojeciDiv.addEventListener('transitionend', () => {
            divPorudzbina.removeChild(postojeciDiv);
        });
    }

    setTimeout(() => form.scrollIntoView({behavior: 'smooth'}), 500);
});


window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 650px)').matches) {
        pozadina.style.opacity = 0.2;
    }
    else {
        const results = document.getElementById('result');
        if (!results) pozadina.style.opacity = 1;
    }
});