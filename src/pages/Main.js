import { useState } from 'react';
import { Login } from '../components/Login';
import { Register } from '../components/Register';

export const Main = () => {
  const [flag, setFlag] = useState(true);

  return (
    <>
      {flag ? (
        <Login changeFlag={() => setFlag(!flag)} />
      ) : (
        <Register changeFlag={() => setFlag(!flag)} />
      )}
    </>
  );
};
