const characterInput = document.getElementById('characterName');
const characterInfo = document.getElementById('characterInfo');

function getCharacters() {
    fetch('http://localhost:3000/characters')
        .then(response => {
            if(!response.ok) {
                throw new Error('La solicitud no se puede procesar');
            }
            return response.json()
        })
        .then(data => {
            characterInfo.innerHTML = '';
            data.characters.forEach(element => {
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
            });
        })
        .catch(err => characterInfo.innerHTML += `<p>No se pueden obtener los datos, ${err}</p>`);
}

getCharacters();

function getCharacter() {
    const characterName = characterInput.value.toLocaleLowerCase();

    fetch(`http://localhost:3000/characters/${characterName}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('La solicitud no se puede procesar');
            }
            return response.json()
        })
        .then(data => {
            characterInfo.innerHTML = '';
            const {name, status, species, gender, origin: {name: originName}, image} = data;
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