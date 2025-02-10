import { useState, useEffect } from "react";
import CartaPokemon from "./CartaPokemon";
import "../styles/ListaPokemons.css";

const ListaPokemon = () => {
    const [pokemones, setPokemones] = useState([]);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        const obtenerPokemons = async () => {
            try {
                const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
                if (!respuesta.ok) throw new Error("No se pudo obtener la lista de Pokémon");

                const datos = await respuesta.json();
                const listaPokemones = await Promise.all(
                    datos.results.map(async (pokemon) => {
                        const respDetalle = await fetch(pokemon.url);
                        if (!respDetalle.ok) throw new Error(`No se pudo obtener detalles de ${pokemon.name}`);

                        const datosPokemon = await respDetalle.json();
                        return {
                            nombre: datosPokemon.name,
                            imagen: datosPokemon.sprites.front_default,
                            sonido: `https://pokemoncries.com/cries/${datosPokemon.id}.mp3`
                        };
                    })
                );

                setPokemones(listaPokemones);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        obtenerPokemons();
    }, []);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };

    const pokemonesFiltrados = pokemones.filter((poke) =>
        poke.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar Pokémon"
                value={filtro}
                onChange={handleFiltroChange}
                className="filtro-input"
            />
            <div className="album">
                {pokemonesFiltrados.map((poke, index) => (
                    <CartaPokemon key={index} nombre={poke.nombre} imagen={poke.imagen} sonido={poke.sonido} />
                ))}
            </div>
        </div>
    );
};

export default ListaPokemon;
