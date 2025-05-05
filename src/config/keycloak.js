import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  authority: "http://34.71.65.193:8080/realms/appest",
  client_id: "fastapi-client",
  redirect_uri: "https://kc2qrv.csb.app/",
  response_type: "code",
  scope: "openid profile email",
  pkce: true,
  code_challenge_method: "S256",
});

// Solution dynamique pour développement
const getRedirectUri = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:3000/";
  }
  return window.location.origin + "/"; // Pour CodeSandbox et production
};

export const initKeycloak = () => {
  return keycloak.init({
    onLoad: "login-required",
    redirectUri: getRedirectUri(),
    pkceMethod: "S256",
    checkLoginIframe: false,
  });
};

export default keycloak;
