import api from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";

const getUser = async <T>(): Promise<T> => {
  const { data } = await api.get<T>(ENDPOINTS.USERS.ME);
  return data;
};

export const userService = { getUser };
