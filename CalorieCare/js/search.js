'use strict'
const searchbar = document.getElementById('searchbar');
const app = document.querySelector('#app');
let characters = [];



fetch('https://hp-api.herokuapp.com/api/characters')
    .then(respuesta => respuesta.json())
    .then(datos => {
        characters = datos;
        for (const character of characters) {
            app.innerHTML += `
           <div class="boxcharacter">
                <div class="col1">
                    <h2>${character.name}</h2>
                    <h4>${character.house}</h4>
                    <p>${character.actor}</p>
                </div>
                <div class="col2">
                <img src="${character.image}" alt="harry potter" class="float-right">
                </div>
        </div>`
        }
        
    });


const filtrar = () => {
    app.innerHTML = '';
    
    const texto = searchbar.value.toLowerCase();
    for (const character of characters) {

        let personaje = character.name.toLowerCase();
        
        console.log(character.name)

        if (personaje.indexOf(texto) !== -1) {
            console.log(character.name)
            app.innerHTML += `
           <div class="boxcharacter">
                <div class="col1">
                    <h2>${character.name}</h2>
                    <h4>${character.house}</h4>
                    <p>${character.actor}</p>
                </div>
                <div class="col2">
                <img src="${character.image}" alt="harry potter" class="float-right">
                </div>
        </div>
           `
        }
    }

    // if (app.innerHTML === '') {
    //     app.innerHTML += `
    //         <p>Search not finded...</p>
    //     `
    // }
}
searchbar.addEventListener('keyup', filtrar);
filtrar()