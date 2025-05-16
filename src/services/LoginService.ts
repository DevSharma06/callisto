import { LoginRequest } from "../data/objects";
import api from "../utils/axiosInstance";

export const LoginService = {
  async signin(loginRequest: LoginRequest) {
    const res = await api.post("/auth/signin", loginRequest);
    return res;
  },
};
