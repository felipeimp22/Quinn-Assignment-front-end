import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const CommentsList = styled.div`
  margin-top: 20px;
`;

export const CommentItem = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 5px;

  h4 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #555;
  }
`;

export const CommentForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
  }

  button {
    padding: 10px;
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      opacity: .5;
    }
  }
`;