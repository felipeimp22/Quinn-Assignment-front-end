import styled from "styled-components";

export const BigTitle = styled.h1`
  font-size: ${(props) => props.theme?.sizes?.bigTitle || "80px"};
  color: ${(props) => props.theme.colors.text};
`;
export const MediumTitle = styled.h1`
  font-size: ${(props) => props.theme?.sizes?.mediumTitle || "60px"};
  color: ${(props) => props.theme.colors.text};
`;

export const SmallTitle = styled.h1`
  font-size: ${(props) => (props) => props.theme?.sizes?.smallTitle || "40px"};
  color: ${(props) => props.theme.colors.text};
`;

export const StyledH1 = styled.h1`
  font-size: ${(props) => (props) => props.theme?.fontSizes?.title || "32px"};
`;

export const StyledP = styled.p`
  font-size: ${(props) => (props) => props.theme?.fontSizes?.p || "16px"};
`;

export const StyledSpan = styled.span`
  font-size: ${(props) => (props) => props.theme?.fontSizes?.span || "18px"};
`;

export const StyledLink = styled.a`
  font-size: ${(props) => (props) => props.theme?.fontSizes?.link || "14px"};
`;
