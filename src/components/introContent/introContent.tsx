import { useRouter } from "next/router";
import { fetchFilteredAudiobooks } from "@/services/fetchFilteredAudiobooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListItems from "@/components/listItems/listItems";
import { GradientLine } from "@/components/gradiendLine/gradientLine";
import {ContentContainer, IntroSection, HeroText, TrendingSection} from './styles'




const IntroContent = () => {
  const [trendings, setTrendings] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const getAudiobooks = async () => {
    try {
      const data = await fetchFilteredAudiobooks("", [], []);
      setTrendings(data.data);
    } catch {
      setError("Failed to fetch audiobooks.");
    }
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

  useEffect(() => {
    getAudiobooks();
  },[]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <ContentContainer>
        <IntroSection>
          <HeroText>
            <h1>Quinn</h1>
            <p style={{color:"white"}}>
              Let yourself be carried away by the sounds, experience the details,
              and transform your routine into moments of pure desire.
            </p>
            <button onClick={() => router.push('audioPlayer?id=1d8c7c04-85ec-4168-9037-1e53021cac6f&audioBookId=18b9a0d9-b535-4a06-a78d-f72a015f9085&path=Lord+of+the+Rings+%2FAndy+Serkis_1.05.+A+Conspiracy+Unmasked.mp3')}>Play Episode 1</button>
          </HeroText>
        </IntroSection>

        <TrendingSection>
          {trendings.length > 0 ? (
            <ListItems
              title="Trending Now 🔥"
              items={trendings}
              onItemClick={(el) => handlePlay(el.id)}
              blackText={false}
            />
          ) : null}
        </TrendingSection>
      </ContentContainer>
      <GradientLine />
    </>
  );
};

export default IntroContent;
