import styled from "styled-components";


export const PageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  button {
    padding: 10px 20px;
    border: none;
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.3s;
    opacity: .7;

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      opacity: .7;
    }

    &.active {
      background: ${(props) => props.theme.colors.primary};
      opacity: 1;

    }
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.primary};
    }
  }

  button {
    padding: 10px;
    background: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      opacity: .01;
    }
  }
`;