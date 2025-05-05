import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const valid = await AuthService.verifyToken();
      setIsAuthenticated(valid);
    };
    verifyAuth();
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
