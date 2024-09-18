import { Routes, Route, Navigate } from 'react-router-dom';
import Accueil from './layout/Accueil';
import Commandes from './layout/Commandes';
import Articles from './layout/Articles';
import Profile from './layout/Profile';
import Login from './auth/Login';
import Home from './components/home/Home';
import MenuArticle from './components/home/MenuArticle';
import Cart from './components/home/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  function ProtectedRoute({ children }) {
    const user = window.localStorage.getItem("adminAccess");

    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return <Navigate to="/login" replace />;
    }

    return children;
  }
  // const params = useLocation();
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu/*' element={<MenuArticle />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </CartProvider>

      <Routes>
        <Route path='/dashboard/accueil' element={
          <ProtectedRoute>
            <Accueil />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/commandes/*' element={
          <ProtectedRoute>
            <Commandes />
          </ProtectedRoute>

        } />
        <Route path='/dashboard/articles' element={
          <ProtectedRoute>
            <Articles />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/compte' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
