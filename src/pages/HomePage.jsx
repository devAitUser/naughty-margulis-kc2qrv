// src/pages/HomePage.jsx
import { MainMenu } from "../components/Dashboard/MainMenu";

const HomePage = ({ keycloak, onLogout }) => {
  const userEmail = keycloak?.tokenParsed?.email || "Utilisateur";

  return (
    <div className="dashboard">
      <header>
        <h1>Bienvenue, {userEmail}</h1>
        <button onClick={onLogout}>Déconnexion</button>
      </header>
      <h2>Inscriptions</h2>
      <MainMenu />
    </div>
  );
};

export default HomePage;
