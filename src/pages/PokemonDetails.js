import { useEffect, useState } from 'react';
import { Toolbar } from '../components/Toolbar';
import { Footer } from '../components/Footer';
import pokemonService from '../services/pokemonService';
import { Spinner } from 'reactstrap';

export const PokemonDetails = ({ id }) => {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    pokemonService.getPokemonById(id).then(response => {
      setPokemon(response);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <Spinner color="primary" />;
  console.log('hp', pokemon.stats[0].base_stat);

  return (
    <div className="container-lg">
      <Toolbar />
      <div className="detail_main">
        <div className="detail_top">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png`}
            width="350"
            height="350"
            alt="pokemon"
          />
        </div>
        <div className="detail_bottom">
          <div className="container-name-stats">
            <h1 className="h2 text-dark">{pokemon.name}</h1>

            <div className="container_stats">
              {pokemon.stats.map((stat, index) => {
                return (
                  <div className="stat" key={index}>
                    <h6>{stat.stat.name}</h6>

                    <div className="progress">
                      <div
                        style={{
                          width: `${stat.base_stat}%`,
                        }}
                        className="bg-success"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="container-table-features">
            <table className="table text-dark text-center">
              <thead>
                <tr>
                  {pokemon.stats.map((stat, index) => {
                    return (
                      <th key={index} scope="col">
                        {stat.stat.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {pokemon.stats.map(stat => (
                    <td>{stat.base_stat}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PokemonDetails;
