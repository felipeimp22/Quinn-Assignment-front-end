import api from "./api";

export const createCategory = async (category_name: string, token: string) => {
  try {
    const response = await api.post(
      `/audiobooks/categories`,
      { category_name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const createGenre = async (genre_name: string, token: string) => {
  try {
    const response = await api.post(
      `/audiobooks/genres`,
      { genre_name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating genre:", error);
    throw error;
  }
};
