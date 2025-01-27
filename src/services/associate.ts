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

export const associateCategory = async (audioBookId: string, categoryId: string, token: string) => {
  await api.post(
    "/audiobooks/categories/associate",
    { audio_book_fk: audioBookId, category_fk: categoryId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const associateGenre = async (audioBookId: string, genreId: string, token: string) => {
  await api.post(
    "/audiobooks/genres/associate",
    { audio_book_fk: audioBookId, genre_fk: genreId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
