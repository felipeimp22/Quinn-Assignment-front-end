import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const ListTitle = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

export const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: pink;
  width: 100%;
  padding: 1rem;
  /* border-bottom: 0.1px solid rgba(168, 168, 168,0.5); */
  background-color: ${(props) => props.theme.colors.background};
`;

export const BorderStyled = styled.div`
background-color: #CCC;
width: 96%;
height: 1px;
border-radius: 4px;
`
export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }
`;

export const PlayButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.secundary};
  }
`;