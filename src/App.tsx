import { useEffect, useState } from "react";
import { LoginRequest } from "./data/objects";
import { LoginService } from "./services/LoginService";
import HomePage from "./HomePage";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const expiresAt = localStorage.getItem("expiredAt");
    if (!token || !expiresAt || Date.now() > parseInt(expiresAt)) {
      // logoutUser();
    }
  }, [token]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const loginRequest: LoginRequest = { username, password };
      const response = await LoginService.signin(loginRequest);

      console.log("Login response: ", await response.data);
      const { token, expiresIn } = await response.data;

      const expiresAt = Date.now() + expiresIn;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      setToken(token);
    } catch (err) {
      console.error("Auth error:", err);
      throw err;
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    setToken(null);
  };
  return token ? <HomePage /> : <LoginForm onLogin={handleLogin} />;
}
export default App;
