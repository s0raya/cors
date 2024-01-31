function getCharacter() {
    const characterInput = document.getElementById('characterName');
    const characterInfo = document.getElementById('characterInfo');

    const characterName = characterInput.value.toLocaleLowerCase();

    fetch(`http://localhost:3000/characters/${characterName}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('La solicitud no se puede procesar');
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            const {name, status, species, gender, origin: {name: originName}, image} = data;
            characterInfo.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}">
            <p>Status: ${status}</p>
            <p>Specie: ${species}</p>
            <p>Gender: ${gender}</p>
            <p>Origin: ${originName}</p>
            `
        })
        .catch(err => characterInfo.innerHTML= `${err}: Imposible acceder al personaje`)
}