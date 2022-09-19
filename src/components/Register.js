import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Alert } from './Alert';

export const Register = ({ changeFlag }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    verify: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState();

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    // console.log(!!user.email, user.verify, user.password);
    if (user.email && user.password.length >= 5 && user.verify.length >= 5) {
      setDisabled(false);
      setError('');
      //   console.log('false');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(user.email, user.verify, user.password);

    if (user.password !== user.verify) return setError('Las contraseñas son diferentes');

    try {
      await register(user.email, user.password);
      navigate('/home');
    } catch (error) {
      setError(error.code);
    }
  };

  return (
    <div className="register_container">
      {error && <Alert error={error} />}

      <form onSubmit={handleSubmit}>
        <button className="btn btn-danger back" onClick={changeFlag}>
          <BiArrowBack />
        </button>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={handleChange}
        />

        <label htmlFor="pass" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="pass"
          name="password"
          onChange={handleChange}
        />

        <label htmlFor="verify" className="form-label">
          Confirmar
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="verify"
          name="verify"
          onChange={handleChange}
        />

        <button className="btn btn-primary" disabled={disabled}>
          Registrar
        </button>
      </form>
    </div>
  );
};
