import { Toolbar } from '../components/Toolbar';
import pokeService from '../services/pokemonService';
import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { TbPokeball } from 'react-icons/tb';
import { Spinner } from 'reactstrap';
import { useAuth } from '../context/authContext';

const Home = () => {
  const [data, setData] = useState([]);
  const [backup, setBackup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selected, setSelected } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    pokeService.getAllPokemon().then(response => {
      setData(response);
      setBackup(response);
      setIsLoading(false);
    });
  }, []);

  const selectType = e => {
    const name = e.target.value;
    let aux = [];

    if (name !== 'todos') {
      data.map((pokemon, index, array) => {
        pokemon.types.map(type => {
          if (type.type.name === name) {
            aux = aux.concat(array[index]);
          }
        });
      });
      setBackup(aux);
    } else {
      setBackup(data);
    }
  };

  const selectPokemon = id => {
    let bandera = false;
    if (selected.length === 0) {
      setSelected(data.filter(pokemon => pokemon.id === id));
    }

    for (let c = 0; c < selected.length; c++) {
      console.log(c);
      if (selected[c].id === id) {
        bandera = true;
        break;
      }
    }

    if (!bandera) {
      setSelected(selected.concat(data.filter(pokemon => pokemon.id === id)));
    }
  };

  const removePokemon = id => {
    setSelected(selected.filter(pokemon => pokemon.id !== id));
  };

  if (isLoading) return <Spinner color="primary" />;

  return (
    <div className="container-lg">
      <Toolbar />
      <div className="home_selector_container col-12">
        <TbPokeball size="32" />
        <select onChange={selectType}>
          <option value="todos" defaultChecked>
            Todos los tipos
          </option>
          <option value="normal">Normal</option>
          <option value="fire">Fuego</option>
          <option value="bug">Incecto</option>
          <option value="water">Agua</option>
        </select>
        <TbPokeball size="32" />
      </div>
      <div className="home_main">
        <div className="home_section px-3 pt-2">
          <ul className="home_container_pokemons">
            {backup.map(pokemon => {
              return (
                <li className="home_li" key={pokemon.id}>
                  <div className={`home_card ${pokemon.types[0].type.name}`}>
                    <div className="home_container_data">
                      <h5 className="home_poke_name h4">{pokemon.name}</h5>
                      <div className="home_poke_types">
                        {pokemon.types.map(({ type }, index) => {
                          return (
                            <p key={index} className="">
                              {type.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="home_buttons">
                      <button
                        onClick={() => {
                          console.log(pokemon.id);
                          navigate(`../PokemonDetail/${pokemon.name}`, {
                            state: {
                              id: pokemon.id,
                            },
                          });
                        }}
                        className="btn btn-outline-dark btn-sm"
                      >
                        Detalles
                      </button>
                      <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => selectPokemon(pokemon.id)}
                      >
                        Seleccionar
                      </button>
                    </div>
                    <img
                      src={pokemon.sprites.front_default}
                      className="home_image"
                      width="150"
                      height="150"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="home_section p-3">
          <table className="table table-light">
            <thead>
              <tr>
                <th>Pokemon</th>
                <th>Habilidad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {selected.map(element => {
                return (
                  <tr key={element.id}>
                    <td className={`container_poke_selected ${element.types[0].type.name}`}>
                      <img src={element.sprites.front_default} width="35" />
                      <p>{element.name}</p>
                    </td>
                    <td className={`${element.types[0].type.name}`}>
                      {element.abilities[0].ability.name}
                    </td>
                    <td className={`${element.types[0].type.name}`}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removePokemon(element.id)}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-warning" onClick={() => setSelected([])}>
            Recargar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
