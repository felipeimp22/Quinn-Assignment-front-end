import styled from "styled-components";

export const AudioPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a0a12;
`;


export const ProgressBarContainer = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
  margin-top: -30px;
  cursor: pointer;
`;

export const ProgressBarBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-bottom: 12px solid #333;
`;

export const ProgressBarForeground = styled.div<{ progress: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-bottom: 12px solid #ff007f;
  clip-path: inset(0 ${(props) => 100 - props.progress}% 0 0);
`;

export const PlayButton = styled.button`
  margin-top: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ff007f;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(255, 0, 127, 0.5);

  &:hover {
    background: #e60072;
  }

  &:before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 14px solid white;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    margin-left: 5px;
    transition: all 0.3s ease-in-out;
  }

  &.pause:before {
    content: "";
    width: 8px;
    height: 16px;
    background: white;
    border: none;
    margin-left: 0;
    display: flex;
    justify-content: space-between;
    border-radius: 2px;
  }
`;