const characterInput = document.getElementById('characterName');
const characterInfo = document.getElementById('characterInfo');
const nextPage = document.getElementById('next-page');
const prevPage = document.getElementById('prev-page');
let url = 'http://localhost:3000/characters/'
let nextUrl;
let prevUrl;
let currentPage = 1;

function getCharacters() {
    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('La solicitud no se puede procesar');
            }
            return response.json()
        })
        .then(data => {
            nextUrl = data.info.next;
            prevUrl = data.info.prev;
            if(data) {
                characterInfo.innerHTML = '';
                data.results.forEach(element => {
                characterInfo.innerHTML += `
                    <figure>
                        <img src="${element.image}" alt="${element.name}">
                        <figcaption>
                            <h2>${element.name}</h2>
                            <p>Status: ${element.status}</p>
                            <p>Specie: ${element.species}</p>
                            <p>Gender: ${element.gender}</p>
                            <p>Origin: ${element.originName}</p>
                        </figcaption>
                    </figure>
                    `
            })
            } else {
                characterInfo.innerHTML = 'Personaje no encontrado';
            }
        })
        .catch(err => characterInfo.innerHTML += `<p>No se pueden obtener los datos, ${err}</p>`);
}

getCharacters();

function getCharacter() {
    const characterName = characterInput.value.toLocaleLowerCase();

    fetch(`${url}${characterName}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('La solicitud no se puede procesar');
            }
            return response.json()
        })
        .then(data => {
            characterInfo.innerHTML = '';
            const {name, status, species, gender, originName, image} = data;
            characterInfo.innerHTML = `
            <figure>
                <img src="${image}" alt="${name}">
                <figcaption>
                    <h2>${name}</h2>
                    <p>Status: ${status}</p>
                    <p>Specie: ${species}</p>
                    <p>Gender: ${gender}</p>
                    <p>Origin: ${originName}</p>
                </figcaption>
            </figure>
            `
        })
        .catch(err => characterInfo.innerHTML= `${err}: Imposible acceder al personaje`)
}


/******************* */

nextPage.addEventListener('click', () => {
    if (nextUrl === null) {
        getCharacters();
    } else {
        url = nextUrl;
        getCharacters()
    }
});

prevPage.addEventListener('click', () => {
    if (prevUrl === null ) {
        getCharacters();
    } else {
        url = prevUrl;
        getCharacters();
    }
});
