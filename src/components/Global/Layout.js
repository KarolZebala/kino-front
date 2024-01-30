import { Outlet, Link } from "react-router-dom";
import './Layout.css';
const Layout = () => {
  const logged = (
    <>
      <nav>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/">Strona głowna</Link>
          </li>          
          <li className="nav-menu-item">
            <Link to="/movies">Filmy</Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/directros">Reżyserowie</Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/movieItems">
              Seanse
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/logout">Wyloguj się</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
  const annonimus = (
    <>
      <nav>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/">Strona głowna</Link>
          </li>          
          <li className="nav-menu-item">
            <Link to="/login">Zaloguj się</Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/register">Zarejestruj się </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
  const jwtToken = sessionStorage.getItem('kinoToken')
  return jwtToken ? logged : annonimus;
};

export default Layout;
