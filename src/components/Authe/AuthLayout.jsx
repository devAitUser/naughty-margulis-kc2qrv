import "../../css/AuthLayout.css";
import universityLogo from "../../img/est.png"; // Importez votre logo

export const AuthLayout = ({ children }) => {
  return (
    <div className="ent-auth-container">
      {/* Bandeau bleu avec logo */}
      <div className="ent-header">
        <img
          src={universityLogo}
          alt="Logo Université"
          className="university-logo"
        />
      </div>

      {/* Boutons en haut */}
      <div className="auth-top-buttons">
        <button className="auth-btn active">Authentification</button>
        <button className="auth-btn">Besoin d'aide ?</button>
      </div>

      {/* Contenu principal */}
      <div className="ent-auth-content">{children}</div>
    </div>
  );
};

export default AuthLayout;
