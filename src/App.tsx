import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FavoritePage from './pages/FavoritePage';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  activeClassName: string;
}

export default function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <nav className="flex justify-center py-4">
          <ul className="flex space-x-4">
            <NavLink to="/" activeClassName="active">Main Page</NavLink>
            <NavLink to="/favorites" activeClassName="active">Favorite Page</NavLink>
          </ul>
        </nav>

        <Routes>
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function NavLink({ to, children, activeClassName }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const classes = isActive ? `${activeClassName} text-lg font-bold text-blue-600 border-b-2 border-blue-600` : 'text-lg font-bold text-blue-600 hover:underline';

  return (
    <li>
      <Link to={to} className={classes}>{children}</Link>
    </li>
  );
}
