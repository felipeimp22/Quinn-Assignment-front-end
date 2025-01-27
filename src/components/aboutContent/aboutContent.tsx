import React, { useState } from "react";
import ListItems from "@/components/listItems/listItems";
import { GradientLine } from "@/components/gradiendLine/gradientLine";
import { ContentContainer, IntroSection, Questions } from "./styles";
interface ListItem {
  id: string;
  title: string;
  subTitle?: string;
  author?: string;
}
const AboutContent = () => {
  const [questions, ] = useState<ListItem[]>([
    {
      id: "1",
      title: "What is audio erotica?",
      subTitle:
        "Audio erotica can be a lot of things: spicy audio stories, guided masturbation, dirty talk, and more. The audios on Quinn are designed to help you get there, but they also involve fun and interesting plots.",
    },
    {
      id: "2",

      title: 'What are “Creators"?',
      subTitle:
        "“Creators” are the voice actors in Quinn audios. You can learn more about a Creator by reading their bio.",
    },
    {
      id: "3",

      title: "I want to be a Quinn Creator.",
      subTitle:
        "Awesome! Please fill out an application here: https://form.typeform.com/to/PEeNfExn and we will get back to you if it is a fit. Thank you so much!",
    },
    {
      id: "4",

      title:
        "I don’t want to voice audios on Quinn, but can I write scripts for Creators?",
      subTitle:
        "Yes! Fill out this application to be added to our scriptwriter database: https://form.typeform.com/to/cX4Qn5M4.",
    },
    {
      id: "5",

      title: "How much does Quinn cost?",
      subTitle:
        "Quinn is $7.99/month or $4.99/month when billed annually. You can also try Quinn for one week free of charge.",
    },
    {
      id: "5",

      title: "I want to work for Quinn!",
      subTitle:
        "Amazing! We are hiring on our Marketing, Engineering, and Creator Relations teams. Please send a resume and cover letter to hiring@tryquinn.com and we'll reach out if we think there's a fit!",
    },
  ]);

  return (
    <>
      <ContentContainer>
        <Questions>
          <ListItems
            title="Frequently Asked Questions"
            items={questions}
            backgroundTransparent={true}
            disablePlay={true}
            blackText={true}
          />
        </Questions>
        <IntroSection></IntroSection>
      </ContentContainer>
      <GradientLine />
    </>
  );
};

export default AboutContent;
