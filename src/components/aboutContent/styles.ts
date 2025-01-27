import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.colors.menuBackground};

  @media (min-width: 1320px) {
    flex-direction: row;

    & > section:nth-child(1) {
      order: 1; /* Trending Section comes first */
    }

    & > section:nth-child(2) {
      order: 2; /* Intro Section comes second */
    }
  }

  @media (max-width: 1319px) {
    & > section:nth-child(1) {
      order: 2; /* Trending Section comes second */
    }

    & > section:nth-child(2) {
      order: 1; /* Intro Section comes first */
    }
  }
`;

export const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: url("/assets/png/man-on-fists-mobile.png") no-repeat right top;
  background-size: cover;
  background-position: right bottom;
  margin-top:-50px;

  @media (min-width: 1024px) and (max-width: 1319px) {
    background: url("/assets/png/man-on-fists-mobile.png") no-repeat right top;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    align-items: flex-start;
    background-size: cover;
    background-position: right ;
    margin-top:-50px

  }

  @media (min-width: 1320px) {
    background: url("/assets/png/man-on-fists-desktop.png") no-repeat right bottom;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    align-items: flex-start;
    background-size: contain;
    background-position: right ;
    margin-top:-50px
  }
`;

export const HeroText = styled.div`
  position: absolute;
  bottom: 5rem;
  padding: 40px;
  color: ${(props) => props.theme.colors.text};
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);

  @media (min-width: 1024px) and (max-width: 1319px) {
    max-width: 40%;
    bottom: 15rem;
    left: 5rem;
  }

  @media (min-width: 1320px) {
    max-width: 40%;
    bottom: 5rem;
    left: 5rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${(props) => props.theme.colors.primary};

    @media (min-width: 1024px) {
      font-size: 4rem;
    }
  }

  p {
    margin: 10px 0;
    font-size: 1rem;
    line-height: 1.5;

    @media (min-width: 1024px) {
      font-size: 1.25rem;
    }
  }

  button {
    margin-top: 20px;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.colors.secundary};
    }

    @media (min-width: 1024px) {
      font-size: 1.2rem;
    }
  }
`;

export const Questions = styled.section`
  width: 100%;
  padding-top: 100px;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h2 {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
      font-size: 1.2rem;
    }

    @media (min-width: 1024px) {
      font-size: 2rem;
    }
  }
`;
