
import { api } from "./api";

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  localStorage.setItem("token", response.data.token);

  return response.data;
};
