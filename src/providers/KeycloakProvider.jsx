// src/providers/KeycloakProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import { initKeycloak } from "../auth/keycloak-auth";

export const AuthContext = createContext();

export const KeycloakProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloakReady, setKeycloakReady] = useState(false);

  useEffect(() => {
    initKeycloak(() => {
      setAuthenticated(true);
      setKeycloakReady(true);
    });
  }, []);

  if (!keycloakReady) {
    return <div>Chargement de l'authentification...</div>;
  }

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {authenticated ? (
        children
      ) : (
        <div>Redirection vers la page de login...</div>
      )}
    </AuthContext.Provider>
  );
};
