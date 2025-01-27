import api from "./api";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  plan: string
) => {
  try {
    const response = await api.post("/users/create", {
      username,
      email,
      password,
      plan,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
