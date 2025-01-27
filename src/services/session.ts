import api from "./api";

export const session = async (email: string, password: string) => {
  try {
    const response = await api.post("/session", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};
