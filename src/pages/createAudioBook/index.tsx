import React, { useState, useEffect } from "react";
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
import { getGenres, getCategories } from "@/services/fetchGenresCategories";
import { createAudioBook } from "@/services/createAudioBook";
import { associateCategory, associateGenre } from "@/services/associate";

const CreateAudioBookPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [duration, setDuration] = useState("");
  const [plan, setPlan] = useState("free");

  const [categories, setCategories] = useState<{id:string, category_name:string}[]>([]);
  const [genres, setGenres] = useState<{id:string, genre_name: string}[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{id:string, category_name:string}[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<{id:string, genre_name: string}[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("You need to be logged in to perform this action.");
      return;
    }

    const fetchData = async () => {
      try {
        const fetchedGenres = await getGenres(token);
        const fetchedCategories = await getCategories(token);
        setGenres(fetchedGenres);
        setCategories(fetchedCategories);
      } catch {
        toast.error("Failed to fetch genres or categories.");
      }
    };

    fetchData();
  }, [token]);

  const handleSelectCategory = (category: {id:string, category_name: string}) => {
    if (!category.id || selectedCategories.find((c) => c.id === category.id)) {
      toast.error("Category already selected or invalid selection.");
      return;
    }
    setSelectedCategories([...selectedCategories, category]);
  };

  const handleSelectGenre = (genre: {id:string, genre_name: string}) => {
    if (!genre.id || selectedGenres.find((g) => g.id === genre.id)) {
      toast.error("Genre already selected or invalid selection.");
      return;
    }
    setSelectedGenres([...selectedGenres, genre]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("You need to be logged in to perform this action.");
      return;
    }

    try {
      const audioBook = await createAudioBook(title, author, duration, plan, token);
      toast.success("AudioBook created successfully!");

      for (const category of selectedCategories) {
        await associateCategory(audioBook.id, category.id, token);
      }

      for (const genre of selectedGenres) {
        await associateGenre(audioBook.id, genre.id, token);
      }

      toast.success("AudioBook, categories, and genres successfully associated!");

      setTitle("");
      setAuthor("");
      setDuration("");
      setPlan("free");
      setSelectedCategories([]);
      setSelectedGenres([]);
    } catch {
      toast.error("Failed to create audiobook. Please try again.");
    }
  };

  return (
    <PageContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Create an AudioBook</Title>

        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter audiobook title"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
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
          <Label htmlFor="plan">Plan</Label>
          <Input
            id="plan"
            type="text"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="Enter plan (e.g., free or premium)"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Categories</Label>
          <select
            onChange={(e) =>
              e.target.value && handleSelectCategory(JSON.parse(e.target.value))
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={JSON.stringify(category)}>
                {category.category_name}
              </option>
            ))}
          </select>
          <div>
            {selectedCategories.map((category) => (
              <span style={{ margin: "2 auto" }} key={category.id}>
                {category.category_name}
              </span>
            ))}
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Genres</Label>
          <select
            onChange={(e) =>
              e.target.value && handleSelectGenre(JSON.parse(e.target.value))
            }
          >
            <option value="">Select a genre</option>
            {genres.map((genre: {id:string, genre_name: string}) => (
              <option key={genre.id} value={JSON.stringify(genre)}>
                {genre.genre_name}
              </option>
            ))}
          </select>
          <div>
            {selectedGenres.map((genre: {id:string, genre_name: string}) => (
              <span style={{ margin: "2 auto" }} key={genre.id}>
                {genre.genre_name}
              </span>
            ))}
          </div>
        </FormGroup>

        <SubmitButton type="submit">Create AudioBook</SubmitButton>
      </RegisterForm>
    </PageContainer>
  );
};

export default CreateAudioBookPage;
