import Keycloak from 'keycloak-js';

// Adressez-vous directement à l'endpoint .well-known
const keycloak = new Keycloak({
  url: 'http://34.71.65.193:8080',
  realm: 'appest',
  clientId: 'fastapi-client',
  enablePKCE: true, // Obligatoire pour les nouvelles versions
  flow: 'standard' // 'implicit' est déprécié
});

// Méthode d'initialisation robuste
export const initKeycloak = async () => {
  try {
    const auth = await keycloak.init({
      onLoad: 'login-required',
      redirectUri: window.location.href, // Dynamique pour CodeSandbox
      checkLoginIframe: false,
      silentCheckSsoFallback: false
    });

    if (!auth) {
      throw new Error('Authentication failed');
    }

    return keycloak;
  } catch (err) {
    console.error('Keycloak init error:', err);
    window.location.reload(); // Fallback simple
  }
};

export default keycloak;