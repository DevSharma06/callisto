import { useState } from "react";
import { LoginRequest } from "./data/objects";
import { LoginService } from "./services/LoginService";
import HomePage from "./HomePage";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = async (username: string, password: string) => {
    try {
      const loginRequest: LoginRequest = { username, password };
      const response = await LoginService.signin(loginRequest);

      console.log("Login response: ", await response.data);
      const { token, expiresIn } = await response.data;

      const expiresAt = Date.now() + expiresIn * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      setToken(token);
    } catch (err) {
      console.error("Auth error:", err);
      throw err;
    }
  };

  return token ? <HomePage /> : <LoginForm onLogin={handleLogin} />;
}
export default App;
