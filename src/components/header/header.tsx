import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  HeaderContainer,
  HamburgerButton,
  ActionButtons,
  SlidingMenu,
} from "./styles";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <HeaderContainer>
      <HamburgerButton onClick={toggleMenu} aria-label="Menu">
        <div></div>
        <div></div>
        <div></div>
      </HamburgerButton>

      <ActionButtons>
        {!isAuthenticated ? (
          <>
            <a href="/login">Login</a>
            <a href="/register" className="register">
              Register
            </a>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </ActionButtons>

      <SlidingMenu isOpen={isMenuOpen}>
        <button className="close" onClick={toggleMenu}>
          ×
        </button>
        <ul>
          {!isAuthenticated ? (
            <>
              <li>
                <a href="/">Landing</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
              <li>
                <a href="/discoverTheNew">Discover the New</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/">Landing</a>
              </li>
              <li>
                <a href="/discoverTheNew">Discover the New</a>
              </li>
              <li>
                <a href="/categoryAndGenre">Create genres and categories</a>
              </li>
              <li>
                <a href="/createAudioBook">Create Audio Book</a>
              </li>
            </>
          )}
        </ul>
        <div className="footer">
          <a href="/privacy">Privacy</a>
          <a href="/policy">Policy</a>
        </div>
      </SlidingMenu>
    </HeaderContainer>
  );
};

export default Header;
