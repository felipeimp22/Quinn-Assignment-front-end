import api from "./api";

export const fetchChapters = async (audioBookId: string, page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get(`/audiobooks/${audioBookId}/chapters`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
};