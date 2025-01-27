import api from "./api";

export const fetchComments = async (audioBookId: string) => {
  try {
    const response = await api.get(`/audiobooks/${audioBookId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (audioBookId: string, comment: string, token: string) => {
  try {
    const response = await api.post(
      `/users/comment`,
      { audioBookId, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};
