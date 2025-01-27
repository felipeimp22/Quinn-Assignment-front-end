import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { fetchChapters } from "@/services/fetchChapters";
import ListItems from "@/components/listItems/listItems";
import { SubmitButton, Title } from "@/components/forms/forms";

interface Chapter {
  id: string;
  title: string;
  audio_book_fk: string;
  duration: string;
  audio_file: string;
}

const ChaptersContainer = styled.div`
  padding: 2rem;
`;

const ChaptersPage = () => {
  const router = useRouter();
  const [chapters, setChapters] = useState<Chapter[]>([]); 
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { id } = router.query;

  const getChapters = async (id: string, currentPage: number) => {
    try {
      const response = await fetchChapters(id, currentPage);
      if (response.data.length === 0) {
        setHasMore(false); 
      } else {
        setChapters((prev) => [...prev, ...response.data]); 
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const handlePlay = (chapter: Chapter) => {
    const audioFilePath = chapter.audio_file.split("\\");
    const audiobookName = audioFilePath[audioFilePath.length - 2];
    const chapterName = audioFilePath[audioFilePath.length - 1];

    router.push({
      pathname: "/audioPlayer",
      query: {
        id: chapter.id,
        audioBookId: chapter.audio_book_fk,
        path: `${audiobookName}/${chapterName}`,
      },
    });
  };

  const handlePushToComments = () => {
    router.push({ pathname: `/comments/${id}` });
  };

  const handlePushToInsertChapter = () => {
    router.push({ pathname: `/createChapter/${id}` });
  };

  useEffect(() => {
    if (id && typeof id === "string") {
      getChapters(id, page);
    }
  }, [id, page]);

  const loadMoreItems = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <ChaptersContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <SubmitButton style={{width: 300, marginTop:20}} onClick={handlePushToComments}>Comments</SubmitButton>
        <SubmitButton  style={{width: 300, marginTop:20}}onClick={handlePushToInsertChapter}>
          Insert Chapter
        </SubmitButton>
      </div>
      {chapters?.length > 0 ? (
        <ListItems
          title="Chapters"
          items={chapters}
          onItemClick={(el: any) => handlePlay(el)}
          loadMoreItems={loadMoreItems}
        />
      ) : (
        <p>No chapters available.</p>
      )}
    </ChaptersContainer>
  );
};

export default ChaptersPage;
