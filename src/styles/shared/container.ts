import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
`;
