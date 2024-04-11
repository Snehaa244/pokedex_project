import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

//useEffect acept a call back and a dependency array,call back k ander jo bhi logic likhnge vo execute hoga,if dependency array nhi pass krnge to pura logic bar bar rerender hoga
    //jab dependancy array banyge to jab phle bar component execute ho jabhi logic render hoga uske bad rerender nhi hoga
    //agar kisi variable ya kisi state variable pe k chnage ko track krna chate ho jab component rerender hoga aur useeffect call hoga
    //eslint mtlb yellow line ki problem can be solved bu=y googling it
    const POKEDOX_URL = 'https://pokeapi.co/api/v2/pokemon';
    async function downloadpokemons()
    {
        const response = await axios.get('POKEDOX_URL');//this download 20 list of pokemon

        const pokemonResults = response.data.results;//we get array of pokemon from the result
        console.log(response.data);

            //iterating over the array of pokemons, and using their url, to create array of promises
            //that will load those 20 pokemon
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
          //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);//array of 20 pokemon detailed data
        console.log(pokemonData);
        //now iterate on the data of each promise and extract id,name,image,types
        const pokeListResult = (pokemonData.map((pokeData) => {
             const pokemon =pokeData.data;
             return{
                  id:pokemon.id,
                  name: pokemon.name,
                  image:( pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :pokemon.sprites.front_shinny,
                  types:pokemon.types}
        }));
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false);
    }
    useEffect (() => {
        downloadpokemons();
    },[]);
return(
    <div className="pokemon-list-wrapper">
        <div>Pokemon List</div>
        { (isLoading) ? 'Loading....':
        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
        }
        </div>
    

)
}
export default PokemonList;