import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from './Alert';

export const Login = ({ changeFlag }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    if (user.email && user.password.length >= 5) {
      setDisabled(false);
      setError('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await login(user.email, user.password);
      navigate('/home');
    } catch (error) {
      setError(error.code);
    }
  };

  return (
    <div className="login_container">
      {error && <Alert error={error} />}

      <form className="login_form" onSubmit={handleSubmit}>
        <div className=" row mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <label className="form-label" htmlFor="pass">
            Contraseña
          </label>
          <input
            className="form-control"
            type="password"
            id="pass"
            name="password"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-outline-primary mb-3" type="submit" disabled={disabled}>
          Enviar
        </button>
      </form>

      <button className="btn btn-success col" onClick={changeFlag}>
        Registrarse
      </button>
    </div>
  );
};
