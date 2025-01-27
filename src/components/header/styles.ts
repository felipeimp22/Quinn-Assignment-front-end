import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: transparent;
`;

export const HamburgerButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30px; 
  height: 24px; 
  cursor: pointer;

  div {
    width: 100%;
    height: 4px; 
    background: ${(props) => props.theme.colors.primary}; 
    border-radius: 2px; 
    transition: all 0.3s ease-in-out;
  }

  &:hover div {
    background: ${(props) =>
      props.theme.colors.primaryGrainy}; 
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  a,
  button {
    color: ${(props) => props.theme.colors.text};
    background: none;
    border: none;
    font-size: ${(props) => props.theme.sizes.fontSize};
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  .register {
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 20px;
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme.colors.menuBackground};
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.menuBackground};
    }
  }
`;

export const SlidingMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background: ${(props) => props.theme.colors.menuBackground};
  color: ${(props) => props.theme.colors.text};
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  @media (min-width: 1024px) {
    width: 30%;
  }
  button.close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0;

    li {
      margin-bottom: 1rem;

      a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.text};
        font-size: ${(props) => props.theme.sizes.fontSize};
        text-transform: capitalize;

        &:hover {
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 2rem;
    left: 2rem;

    a {
      margin-right: 1rem;
      color: ${(props) => props.theme.colors.text};
      font-size: 0.9rem;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }
`;
