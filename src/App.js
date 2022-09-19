import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Main } from './pages/Main';
import AuthProvider from './context/authContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PokemonDetails } from './pages/PokemonDetails';
import { NotFound } from './pages/NotFound';

const App = () => {
  return (
    <div className="routes">
      <AuthProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PokemonDetail/:name"
            element={
              <ProtectedRoute>
                <PokemonDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
