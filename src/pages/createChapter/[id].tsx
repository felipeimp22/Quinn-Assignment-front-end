import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  PageContainer,
  RegisterForm,
  Title,
  FormGroup,
  Label,
  Input,
  SubmitButton,
} from "@/components/forms/forms";
import { toast } from "react-toastify";
import { createChapter } from "@/services/createChapter";

const InsertChapterPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get audiobook ID from query params
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!audioFile) {
      toast.error("Please select an audio file.");
      return;
    }
  
    try {
      await createChapter(id as string, title, duration, audioFile);
      toast.success("Chapter inserted successfully!");
      router.push(`/chapters?id=${id}`);
    } catch (error) {
      console.error("Error creating chapter:", error);
      toast.error("Failed to create chapter. Please try again.");
    }
  };

  return (
    <PageContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Insert Chapter</Title>

        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter chapter title"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration (e.g., 5:30)"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="audioFile">Audio File</Label>
          <Input
            id="audioFile"
            type="file"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">Insert Chapter</SubmitButton>
      </RegisterForm>
    </PageContainer>
  );
};

export default InsertChapterPage;
