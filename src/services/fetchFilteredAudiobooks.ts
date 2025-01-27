import api from "./api";

export const fetchFilteredAudiobooks = async (
  title: string,
  categories: string[],
  genres: string[],
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await api.post(`/audiobooks/filter?limit=${limit}&page=${page}`, {
      title,
      categories,
      genres,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching audiobooks:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};

