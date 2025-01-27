import api from "./api";

export const createAudioBook = async (
  title: string,
  author: string,
  duration: string,
  plan: string,
  token: string
) => {
  try {
    const response = await api.post(
      "/audiobooks",
      { title, author, duration, plan },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the user's token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating audiobook:", error);
    throw error;
  }
};
