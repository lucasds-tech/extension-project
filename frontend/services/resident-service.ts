import { api } from "./api";

export const getResidents = async () => {
  const response = await api.get("/residents");
  return response.data;
};

export const createResident = async (resident: any) => {
  const response = await api.post("/residents", resident);
  return response.data;
};

export const updateResident = async (id: number, resident: any) => {
  const response = await api.put(`/residents/${id}`, resident);
  return response.data;
};

export const deleteResident = async (id: number) => {
  return api.delete(`/residents/${id}`);
};
