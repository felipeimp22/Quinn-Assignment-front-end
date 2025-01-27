import React, { useState, useEffect, useCallback } from "react";
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
import { getGenres, getCategories } from "@/services/fetchGenresCategories";
import { fetchFilteredAudiobooks } from "@/services/fetchFilteredAudiobooks";
import { toast } from "react-toastify";
import ListItems from "@/components/listItems/listItems";
import { ListWrapper } from "./styles";

const FilterAudioBooksPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<any[]>([]);
  const [audioBookFiltered, setAudioBookFiltered] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
    const router = useRouter();

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
      } catch (error) {
        toast.error("Failed to fetch genres or categories.");
      }
    };

    fetchData();
  }, [token]);

  const handleSelectCategory = (category: any) => {
    if (selectedCategories.find((c) => c.id === category.id)) {
      toast.error("Category already selected.");
      return;
    }
    setSelectedCategories([...selectedCategories, category]);
  };

  const handleSelectGenre = (genre: any) => {
    if (selectedGenres.find((g) => g.id === genre.id)) {
      toast.error("Genre already selected.");
      return;
    }
    setSelectedGenres([...selectedGenres, genre]);
  };

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetchFilteredAudiobooks(
        title,
        selectedCategories.map((cat) => cat.category_name),
        selectedGenres.map((gen) => gen.genre_name),
        page,
        10
      );
      setAudioBookFiltered((prev) => [...prev, ...response.data]);
      setPage((prev) => prev + 1);
      setHasMore(response.page < response.totalPages);
    } catch (error) {
      toast.error("Failed to load more audiobooks.");
    } finally {
      setLoading(false);
    }
  }, [
    title,
    selectedCategories,
    selectedGenres,
    page,
    token,
    loading,
    hasMore,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAudioBookFiltered([]);
    setPage(1);
    setHasMore(true);

    try {
      const response = await fetchFilteredAudiobooks(
        title,
        selectedCategories.map((cat) => cat.category_name),
        selectedGenres.map((gen) => gen.genre_name),
        1,
        10
      );
      setAudioBookFiltered(response.data);
      setHasMore(response.page < response.totalPages);
    } catch (error) {
      toast.error("Failed to filter audiobooks.");
    }
  };

  const handleRemoveCategory = (id: string) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleRemoveGenre = (id: string) => {
    setSelectedGenres((prev) => prev.filter((gen) => gen.id !== id));
  };

  const handlePlay = async (id: string) => {
    try {
      router.push({
        pathname: "/chapters",
        query: { id: id },
      });
    } catch (error) {
      toast.error("Failed to fetch chapters.");
      console.error(error);
    }
  };
  return (
    <PageContainer style={{ flexDirection: "column", maxHeight: "100%" }}>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Filter AudioBooks</Title>

        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter audiobook title"
          />
        </FormGroup>

        <FormGroup>
          <Label>Categories</Label>
          <select
            onChange={(e) => handleSelectCategory(JSON.parse(e.target.value))}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={JSON.stringify(category)}>
                {category.category_name}
              </option>
            ))}
          </select>
          <div>
            {selectedCategories.map((category) => (
              <span
                key={category.id}
                style={{ margin: "5px", cursor: "pointer", color: "red" }}
                onClick={() => handleRemoveCategory(category.id)}
              >
                {category.category_name} ✖
              </span>
            ))}
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Genres</Label>
          <select
            onChange={(e) => handleSelectGenre(JSON.parse(e.target.value))}
          >
            <option value="" disabled>
              Select a genre
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={JSON.stringify(genre)}>
                {genre.genre_name}
              </option>
            ))}
          </select>
          <div>
            {selectedGenres.map((genre) => (
              <span
                key={genre.id}
                style={{ margin: "5px", cursor: "pointer", color: "red" }}
                onClick={() => handleRemoveGenre(genre.id)}
              >
                {genre.genre_name} ✖
              </span>
            ))}
          </div>
        </FormGroup>

        <SubmitButton type="submit">Search</SubmitButton>
      </RegisterForm>
      <ListWrapper>
        {audioBookFiltered.length > 0 && (
          <ListItems
            title="Search Results"
            items={audioBookFiltered}
            onItemClick={(el) => handlePlay(el.id)}
            loadMoreItems={loadMoreItems}
          />
        )}
      </ListWrapper>
    </PageContainer>
  );
};

export default FilterAudioBooksPage;
