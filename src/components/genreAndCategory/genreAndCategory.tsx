import React, { useState } from "react";
import { createCategory, createGenre } from "@/services/createCategoriesAndGenres";
import { toast } from "react-toastify";
import {FormContainer, PageContainer, ToggleButtonContainer} from "./styles"

const CreateCategoryGenre: React.FC = () => {
  const [isCreatingCategory, setIsCreatingCategory] = useState(true); 
  const [inputValue, setInputValue] = useState(""); 
  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("You need to be logged in to perform this action.");
      return;
    }

    try {
      if (isCreatingCategory) {
        await createCategory(inputValue, token); 
        toast.success("Category created successfully!");
      } else {
        await createGenre(inputValue, token); 
        toast.success("Genre created successfully!");
      }
      setInputValue(""); 
    } catch {
      toast.error("Failed to create. Please try again.");
    }
  };

  return (
    <PageContainer>
      <h1>{isCreatingCategory ? "Create Category" : "Create Genre"}</h1>
      <ToggleButtonContainer>
        <button
          type="button"
          className={isCreatingCategory ? "active" : ""}
          onClick={() => setIsCreatingCategory(true)}
        >
          Create Category
        </button>
        <button
          type="button"
          className={!isCreatingCategory ? "active" : ""}
          onClick={() => setIsCreatingCategory(false)}
        >
          Create Genre
        </button>
      </ToggleButtonContainer>

      <FormContainer onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={
            isCreatingCategory ? "Enter category name" : "Enter genre name"
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </FormContainer>
    </PageContainer>
  );
};

export default CreateCategoryGenre;
