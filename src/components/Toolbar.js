import { useAuth } from '../context/authContext';
import { BiUser } from 'react-icons/bi';
import { useNavigate, NavLink } from 'react-router-dom';

export const Toolbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleClick = async e => {
    await logout();
  };

  return (
    <div className=" navbar navbar-expand-lg toolbar_container ">
      <div className="container-fluid align-items-center">
        <h1 className="h6">
          <BiUser />
          Bienvenido, {user.email}
        </h1>

        <img src="../../assets/pokemon-logo.png" width="60px" height="50px" />

        <ul className="nav">
          <li className="nav-item">
            <NavLink to={'/home'} className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/home'} className="nav-link">
              Habilidades
            </NavLink>
          </li>
          <li className="nav-item">
            <a type="button" href="#" className="nav-link" onClick={handleClick}>
              Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
