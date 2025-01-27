import api from "./api";

export const getCategories = async (token: string) => {
    const response = await api.get("/audiobooks/getAllCategories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  };
  
  export const getGenres = async (token: string) => {
    const response = await api.get("/audiobooks/getAllGenres", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  };