import api from "./api";

export const createChapter = async (audioBookFk: string, title: string, duration: string, audioFile: File) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("audio_file", audioFile); 

  const url = `/audiobooks/chapters?audio_book_fk=${encodeURIComponent(audioBookFk)}&title=${encodeURIComponent(title)}&duration=${encodeURIComponent(duration)}`;

  return api.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
