const listaPokemon = document.querySelector('#listaPokemon');// las clases se siempre se llama con numeral (#)
 let URL = 'https://pokeapi.co/api/v2/pokemon/';
 const botonesHeader = document.querySelectorAll('.btn-header'); //llamamos a los botones del header
 const search = document.getElementById("searchPokemon")//llamamos a la barra de buscar 
const pokemonTodos = document.getElementById("listaPokemon")//llamamos al div contenedor
 //i = sera la cantidad de pokemon que queremos iterar, i sera i al pincipio y subira hasta 151 mediante cada iteracion
 for ( let i=1; i <= 151; i++){
    fetch(URL + i)
    //colocamos la respuesta y que la respuesta se convierta en json.'en una cadena de string'
    .then((response) => response.json())
    //pasamos la data como parametro
    .then(data => mostrarPokemon(data))
 }
 function mostrarPokemon(data) {
    //para buscar la cantidad de tipos de los pokemon habria que acceder a la profundidad del objeto y esto lo coseguimos haciendo un .map en los datos de los tipos como se ve en el ejemplo de abajo  
    let tipos = data.types.map((type) => `<p class="${type.type.name} tipos">${type.type.name}</p>`);
    tipos = tipos.join ('');

    let dataId = data.id.toString();
    if(dataId.length === 1) {
        dataId = "00" + dataId;
    }else if( dataId.length === 2) {
        dataId = "0" + dataId;
    }

    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML = `   
        <p class="pokemon-id-back">#${dataId}</p>
        <div class="pokemon-imagen">
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${dataId}</p>
                    <h2 class="pokemon-nombre">${data.name}</h2>
                </div>
                <div class="pokemon-tipos">
                ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="altura">${data.height}m</p>
                    <p class="peso">${data.weight}kg</p>
                </div>   
            </div>
        `;
        listaPokemon.append(div);
 }

 botonesHeader.forEach(boton => boton.addEventListener('click',(event) =>{
    const botonId = event.currentTarget.id;//currentarget me trae el boton directamente del html 
    listaPokemon.innerHTML= '';

    //llamamos de nuevo el for para hacer el filtrado de pokemones
    for ( let i=1; i <= 151; i++){
        fetch(URL + i)
        //colocamos la respuesta y que la respuesta se convierta en json.'en una cadena de string'
        .then((response) => response.json())
        //pasamos la data como parametro
        .then(data =>{
            if (botonId === 'ver-todos'){
                mostrarPokemon(data);
            } else{
                const tipos = (data.types.map(type => type.type.name));
                if (tipos.some(tipo => tipo.includes(botonId))){
                mostrarPokemon(data);
            } 

            }
        })
        
    }
   
 }))


search.addEventListener("keyup", () =>{
 const buscar = search.value.toLowerCase();
 
 for (let pokemon of pokemonTodos.children) //esto deberia iterar sobre los hijos de lista pokemon por ende las tarjetas a buscar 
 {
    const pokemonName = pokemon.querySelector(".pokemonName").textContent.toLowerCase();
    //este obtiene el texto del elemento y lo vuelve minuscula
    if(pokemonName.includes(buscar)){
        Clipboard.style.display = "block";
    } else {
        Clipboard.style.display ='none';
    }
 }
})