import React, { useState } from "react";
import "../../css/LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faQuestionCircle,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form">
      <h2>
        <FontAwesomeIcon icon={faKey} /> AUTHENTIFICATION
      </h2>

      <div className="new-user-prompt">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
        <span>Nouveau à l'université ? Validez votre compte</span>
      </div>

      <div className="form-group">
        <label>
          <FontAwesomeIcon icon={faUser} /> Username:
        </label>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input type="text" placeholder="Nom d'utilisateur" />
        </div>
      </div>

      <div className="form-group">
        <label>
          <FontAwesomeIcon icon={faLock} /> Password:
        </label>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>

      <div className="login-footer">
        <button className="login-btn">
          <FontAwesomeIcon icon={faSignInAlt} /> LOGIN
        </button>
        <div className="forgot-password">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span>Forgot your password?</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
