const pokemonNumber = document.querySelector('.pokemon-number') 
const pokemonName = document.querySelector('.pokemon-name')
const pokemonImg = document.querySelector('.pokemon-img')
const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input-search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

// data pokemon
const fetchPokemon = async(pokemon) =>{
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(apiResponse.status == 200){
        const data = await apiResponse.json()
        return data
    }
}

const renderPokemon = async(pokemon) =>{
    pokemonName.textContent = 'loading...'
    pokemonNumber.textContent = ''

    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonImg.style.display = 'block'
        pokemonNumber.textContent = `${data.id}`
        pokemonName.textContent = `${data.name}`
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        
        searchPokemon = data.id
        inputSearch.value = ''
    }else{
        pokemonImg.style.display = 'none'
        pokemonNumber.textContent =''
        pokemonName.textContent = 'Not found :('
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase())

})

buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)