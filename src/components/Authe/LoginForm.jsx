import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/LoginForm.css"; // Fichier de styles (à créer)

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isNewUser: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation simple
    if (!formData.username || !formData.password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      // Configuration pour Keycloak
      const authData = new URLSearchParams();
      authData.append("client_id", "fastapi-client");
      authData.append("grant_type", "password");
      authData.append("username", formData.username);
      authData.append("password", formData.password);
      authData.append("scope", "openid profile email");

      // Option pour développement seulement (supprimer en production)
      axios.defaults.withCredentials = true;

      const response = await axios.post(
        "http://34.71.65.193:8080/realms/appest/protocol/openid-connect/token",
        authData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Stockage des tokens
      localStorage.setItem("keycloakToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

      // Notification du succès
      onLoginSuccess();

      // Redirection vers le dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Erreur de connexion:", err);

      let errorMessage = "Échec de la connexion";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Identifiant ou mot de passe incorrect";
        } else if (err.response.data?.error_description) {
          errorMessage = err.response.data.error_description;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Redirection vers la page de réinitialisation
    window.location.href =
      "http://34.71.65.193:8080/realms/appest/login-actions/reset-credentials?client_id=fastapi-client";
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h2>AUTHENTIFICATION</h2>

        {error && (
          <div className="error-message">
            <i className="fa fa-exclamation-circle"></i> {error}
          </div>
        )}

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isNewUser"
              checked={formData.isNewUser}
              onChange={handleChange}
            />
            Nouveau à l'université ? Validez votre compte
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-footer">
            <label className="checkbox-label">
              <input type="checkbox" onClick={handleForgotPassword} readOnly />
              <span onClick={handleForgotPassword}>Mot de passe oublié ?</span>
            </label>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa fa-spinner fa-spin"></i> Connexion...
                </>
              ) : (
                "SE CONNECTER"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
